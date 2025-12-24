import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../modules/users/user.schema';
import { Cycle, CycleDocument } from '../modules/cycles/cycle.schema';
import { DailyLog, DailyLogDocument } from '../modules/tracking/daily-log.schema';
import { Article, ArticleDocument } from '../modules/articles/article.schema';
import { Tip, TipDocument } from '../modules/tips/tip.schema';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Cycle.name) private cycleModel: Model<CycleDocument>,
    @InjectModel(DailyLog.name) private dailyLogModel: Model<DailyLogDocument>,
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    @InjectModel(Tip.name) private tipModel: Model<TipDocument>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    // Check if already seeded
    const existingUser = await this.userModel.findOne().exec();
    if (existingUser) {
      console.log('Database already seeded');
      return;
    }

    console.log('Seeding database...');

    // Create user
    const user = await this.userModel.create({
      firstName: 'Emmanuelle',
      lastName: 'Smith',
      email: 'emmanuelle@example.com',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      averageCycleLength: 28,
      averagePeriodLength: 5,
      dismissedCards: [],
    });

    // Create current cycle (started about 21 days ago)
    const cycleStartDate = new Date();
    cycleStartDate.setDate(cycleStartDate.getDate() - 20);
    cycleStartDate.setHours(0, 0, 0, 0);

    const currentCycle = await this.cycleModel.create({
      userId: user._id,
      startDate: cycleStartDate,
      isActive: true,
      periodLength: 5,
    });

    // Create daily logs for the past 30 days
    const symptoms = {
      physicalPain: ['cramps', 'fatigue', 'headache', 'bloating', 'breast_tenderness', 'lower_back_pain'],
      moodMental: ['happy', 'neutral', 'sad', 'irritability', 'cravings', 'mood_swings'],
      periodIndicators: ['spotting', 'heavier_flow', 'lighter_flow'],
      sexualHealth: ['increased_sex_drive', 'decreased_sex_drive'],
    };

    for (let i = 30; i >= 0; i--) {
      const logDate = new Date();
      logDate.setDate(logDate.getDate() - i);
      logDate.setHours(0, 0, 0, 0);

      const cycleDay = Math.floor((logDate.getTime() - cycleStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      const isPeriodDay = cycleDay >= 1 && cycleDay <= 5;

      // Random symptoms based on cycle phase
      const randomSymptoms = (arr: string[], max: number) => {
        const count = Math.floor(Math.random() * max);
        return arr.sort(() => Math.random() - 0.5).slice(0, count);
      };

      await this.dailyLogModel.create({
        userId: user._id,
        cycleId: currentCycle._id,
        date: logDate,
        periodIndicators: isPeriodDay ? randomSymptoms(symptoms.periodIndicators, 2) : [],
        physicalPain: randomSymptoms(symptoms.physicalPain, 4),
        moodMental: randomSymptoms(symptoms.moodMental, 3),
        sexualHealth: randomSymptoms(symptoms.sexualHealth, 1),
        flowIntensity: isPeriodDay ? Math.floor(Math.random() * 7) + 3 : Math.floor(Math.random() * 3),
        notes: i % 5 === 0 ? 'After lunch' : '',
        isPeriodDay,
      });
    }

    // Create articles
    const articles = [
      {
        title: '5 Ways to Reduce Stress During Your Cycle',
        content: 'Managing stress during your menstrual cycle is important for overall well-being...',
        excerpt: 'Learn effective stress management techniques tailored for your cycle.',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
        tags: ['stress', 'wellness', 'mental-health'],
        readTimeMinutes: 5,
      },
      {
        title: 'Best Nutrition Tips for Better Energy',
        content: 'What you eat can significantly impact your energy levels throughout your cycle...',
        excerpt: 'Discover foods that boost your energy naturally.',
        imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop',
        tags: ['nutrition', 'energy', 'diet'],
        readTimeMinutes: 4,
      },
      {
        title: 'How Sleep Affects Hormonal Balance',
        content: 'Quality sleep is essential for maintaining hormonal balance...',
        excerpt: 'Understanding the sleep-hormone connection.',
        imageUrl: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop',
        tags: ['sleep', 'hormones', 'wellness'],
        readTimeMinutes: 6,
      },
    ];

    for (const article of articles) {
      await this.articleModel.create(article);
    }

    // Create tips
    const tips = [
      {
        title: 'Stay Comfortable',
        content: 'On heavy flow days, prioritize comfort. Stay hydrated and use heating pads for abdominal relief.',
        icon: '🌸',
        cycleDays: [1, 2, 3, 4, 5, 21, 22, 23],
        category: 'comfort',
        actionText: 'Listen to your body',
      },
      {
        title: 'Drink Enough Water',
        content: 'Stay hydrated! Drink 6-8 glasses of water daily to support your health and reduce bloating.',
        icon: '💧',
        cycleDays: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        category: 'hydration',
        actionText: '8 glasses daily',
      },
      {
        title: 'Gentle Movement',
        content: 'Light stretching and yoga can help ease discomfort and improve your mood.',
        icon: '🧘',
        cycleDays: [1, 2, 3, 4, 5, 20, 21, 22, 23, 24, 25],
        category: 'exercise',
        actionText: 'Listen to your body',
      },
      {
        title: 'Rest Well',
        content: 'Your body needs extra rest during this phase. Aim for 7-9 hours of quality sleep.',
        icon: '😴',
        cycleDays: [1, 2, 3, 4, 5, 26, 27, 28],
        category: 'rest',
        actionText: 'Prioritize sleep',
      },
      {
        title: 'Nourish Yourself',
        content: 'Eat iron-rich foods like leafy greens, lean meat, and legumes to replenish nutrients.',
        icon: '🥗',
        cycleDays: [1, 2, 3, 4, 5, 6, 7],
        category: 'nutrition',
        actionText: 'Eat well',
      },
    ];

    for (const tip of tips) {
      await this.tipModel.create(tip);
    }

    console.log('Database seeded successfully!');
  }
}
