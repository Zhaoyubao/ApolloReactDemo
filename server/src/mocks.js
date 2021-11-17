const TASKS = [
    {
        id: 1,
        status: 'TODO',
        type: 'CLEANING',
        priority: 'MEDIUM',
        todo_date: '2021-11-20 13:00:00',
        notes: '',
        assignee_id: 3,
        company_id: 2,
        order_id: 1,
    },
    {
        id: 2,
        status: 'COMPLETED',
        type: 'CHECKOUT',
        priority: 'HIGH',
        todo_date: '2021-11-22 14:30:00',
        notes: '',
        assignee_id: 1,
        company_id: 1,
        order_id: 1,
    },
    {
        id: 3,
        status: 'INPROGRESS',
        type: 'CHECKIN',
        priority: 'LOW',
        todo_date: '2021-11-24 15:30:00',
        notes: '',
        assignee_id: 2,
        company_id: 1,
        order_id: 1,
    }
];

const ACCOUNTS = [
    {
        id: 1,
        first_name: 'WEI',
        last_name: 'WU',
        company_id: 1
    },
    {
        id: 2,
        first_name: 'JUNCI',
        last_name: 'ZHAO',
        company_id: 1
    },
    {
        id: 3,
        first_name: 'YUBAO',
        last_name: 'ZHAO',
        company_id: 2
    },
    {
        id: 4,
        first_name: 'TERRY',
        last_name: 'WANG',
        company_id: 2
    }
];

const RESERVATIONS = [
    {
        id: 1,
        customer_name: 'yubao',
        guest_count: 3,
        check_in_date: '2022-01-01 14:00:00',
        check_out_date: '2022-01-05 15:00:00',
        status_code: 'PAID',
        platform_code: 'AIRBNB'
    },
];

const COMPANYS = [
    {
        id: 1,
        company_name: 'Company1',
        phone_number: '1234567890',
        email: 'company1@gmail.com',
        cleaning_rules: 'All bed sheets should be replaced, the floor ......'
    },
    {
        id: 2,
        company_name: 'Company2',
        phone_number: '1234567890',
        email: 'company2@gmail.com',
        cleaning_rules: 'All bed sheets should be replaced......'
    },
];

const TASKITEMS = [
    {
        id: 1,
        item_type: 'SUPPLY',
        code: 'TV',
        amount: '1',
        task_id: 1
    },
    {
        id: 2,
        item_type: 'SUPPLY',
        code: 'PAPER',
        amount: '3',
        task_id: 1
    },
];

export { 
    TASKS,
    ACCOUNTS,
    RESERVATIONS,
    COMPANYS,
    TASKITEMS,
}; 