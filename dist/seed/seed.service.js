"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../modules/users/user.schema");
const cycle_schema_1 = require("../modules/cycles/cycle.schema");
const daily_log_schema_1 = require("../modules/tracking/daily-log.schema");
const article_schema_1 = require("../modules/articles/article.schema");
const tip_schema_1 = require("../modules/tips/tip.schema");
let SeedService = class SeedService {
    userModel;
    cycleModel;
    dailyLogModel;
    articleModel;
    tipModel;
    constructor(userModel, cycleModel, dailyLogModel, articleModel, tipModel) {
        this.userModel = userModel;
        this.cycleModel = cycleModel;
        this.dailyLogModel = dailyLogModel;
        this.articleModel = articleModel;
        this.tipModel = tipModel;
    }
    async onModuleInit() {
        await this.seed();
    }
    async seed() {
        const existingUser = await this.userModel.findOne().exec();
        if (existingUser) {
            console.log('Database already seeded');
            return;
        }
        console.log('Seeding database...');
        const user = await this.userModel.create({
            firstName: 'Emmanuelle',
            lastName: 'Smith',
            email: 'emmanuelle@example.com',
            avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
            averageCycleLength: 28,
            averagePeriodLength: 5,
            dismissedCards: [],
        });
        const cycleStartDate = new Date();
        cycleStartDate.setDate(cycleStartDate.getDate() - 20);
        cycleStartDate.setHours(0, 0, 0, 0);
        const currentCycle = await this.cycleModel.create({
            userId: user._id,
            startDate: cycleStartDate,
            isActive: true,
            periodLength: 5,
        });
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
            const randomSymptoms = (arr, max) => {
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
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(cycle_schema_1.Cycle.name)),
    __param(2, (0, mongoose_1.InjectModel)(daily_log_schema_1.DailyLog.name)),
    __param(3, (0, mongoose_1.InjectModel)(article_schema_1.Article.name)),
    __param(4, (0, mongoose_1.InjectModel)(tip_schema_1.Tip.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], SeedService);
//# sourceMappingURL=seed.service.js.map