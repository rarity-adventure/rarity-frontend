import { createAction } from '@reduxjs/toolkit'

export const updateStats = createAction<{ globals: []; classes: []; levels: [] }>('stats/updateStats')
