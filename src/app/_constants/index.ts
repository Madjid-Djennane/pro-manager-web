import { Injectable } from '@angular/core';

@Injectable()
export class AppConstant {

    tasksPriority = {
        LOW: 'low',
        MEDIUM: 'medium',
        HIGH: 'high'
    };

    tasksStatus = {
        PENDING: 'pending',
        IN_PROGRESS: 'in_progress',
        REVIEW: 'review',
        COMPLETED: 'completed',
        WONT_FIX: 'wont_fix'
    };

    tasksCategories = {
        BUG: 'bug',
        IMPROVEMENT: 'improvement',
        FEATURE: 'feature'
    };

}
