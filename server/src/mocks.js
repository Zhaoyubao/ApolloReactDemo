const TASKS = [
    {
        id: 1,
        status: 'TODO',
        type: 'CLEANING',
        priority: 'MEDIUM',
        accountId: 3,
        companyId: 2
    },
    {
        id: 2,
        status: 'COMPLETED',
        type: 'CHECKOUT',
        priority: 'HIGH',
        accountId: 1,
        companyId: 1
    },
    {
        id: 3,
        status: 'INPROGRESS',
        type: 'CHECKIN',
        priority: 'LOW',
        accountId: 2,
        companyId: 1
    }
];

const ACCOUNTS = [
    {
        id: 1,
        first_name: 'WEI',
        last_name: 'WU',
        companyId: 1
    },
    {
        id: 2,
        first_name: 'JUNCI',
        last_name: 'ZHAO',
        companyId: 1
    },
    {
        id: 3,
        first_name: 'YUBAO',
        last_name: 'ZHAO',
        companyId: 2
    },
    {
        id: 4,
        first_name: 'TERRY',
        last_name: 'WANG',
        companyId: 2
    }
];

export { TASKS, ACCOUNTS }; 