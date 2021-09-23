import { createAction } from '@reduxjs/toolkit'

export const updateAnalytics = createAction<{ globals: []; classes: []; levels: [] }>('analytics/updateAnalytics')
