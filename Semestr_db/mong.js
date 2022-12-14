db.Sports_facilities.drop()
db.Types_of_sports.drop()
db.Coaches.drop()
db.Athletes.drop()
db.Competitions.drop()
db.Awards.drop()

//----------------------Types_of_sports-------------------------------------------------------------------------------------
let Types_of_sports_1 = db.Types_of_sports.insertOne({title: "Bandy"})
let Types_of_sports_2 = db.Types_of_sports.insertOne({title: "Football"})
let Types_of_sports_3 = db.Types_of_sports.insertOne({title: "Swimming"})
let Types_of_sports_4 = db.Types_of_sports.insertOne({title: "Running"})
let Types_of_sports_5 = db.Types_of_sports.insertOne({title: "Weightlifting"})

//-----------------------Sports_facilities-----------------------------------------------------------------------------
let Sports_facilities_1 = db.Sports_facilities.insertOne({
    title: "Ice Arena",
    address: "7/2 Molodezhny Avenue",
    category: "sports complex",
    attributes: [{
        title:"supported sports",
        meaning:12,
        measure_unit: "quantity",
    },
        {
            title:"number of simulators",
            meaning:53,
            measure_unit: "quantity",
        }]})
let Sports_facilities_2 = db.Sports_facilities.insertOne({
    title: "Shakhtar Stadium",
    address: "32 Rutgers Street",
    category: "stadium",
    attributes: [{
        title:"capacity",
        meaning:5000,
        measure_unit: "quantity",
    },
        {
            title:"illumination",
            meaning:300,
            measure_unit: "lumen per square meter",
        }]})
let Sports_facilities_3 = db.Sports_facilities.insertOne({
    title: "Kuzbass Ice Palace",
    address: "12 Pritomsky Prospekt",
    category: "ice palace",
    attributes: [{
        title:"area of the ice cover",
        meaning:12000,
        measure_unit: "square meters",
    },
        {
            title:"the most popular sport",
            meaning:"bandy",
            measure_unit: "sport",
        }]})
let Sports_facilities_4 = db.Sports_facilities.insertOne({
    title: "Kirovets",
    address: "2 Ushakov Street",
    category: "sports complex",
    attributes: [{
        title:"supported sports",
        meaning:16,
        measure_unit: "quantity",
    },
        {
            title:"number of simulators",
            meaning:34,
            measure_unit: "quantity",
        }]})
let Sports_facilities_5 = db.Sports_facilities.insertOne({
    title: "Chemist Stadium",
    address: "41 Kirova Street",
    category: "stadium",
    attributes: [{
        title:"capacity",
        meaning:3500,
        measure_unit: "quantity",
    },
        {
            title:"illumination",
            meaning:500,
            measure_unit: "lumen per square meter",
        }]})

//----------------------Coaches-------------------------------------------------------------------------------------
let Coaches_1 = db.Coaches.insertOne({
    first_name: "Yana",
    last_name: "Ivanova",
    patronymic: "Yuryevna",
    work_experience: 20,
    sport_type: Types_of_sports_2.insertedId
    })
let Coaches_2 = db.Coaches.insertOne({
    first_name: "Aleksey",
    last_name: "Kucher",
    patronymic: "Nicolaevich",
    work_experience: 67,
    sport_type: Types_of_sports_1.insertedId
})
let Coaches_3 = db.Coaches.insertOne({
    first_name: "Tatiana",
    last_name: "Aleksandrovna",
    patronymic: "Berezina",
    work_experience: 17,
    sport_type: Types_of_sports_5.insertedId
})
let Coaches_4 = db.Coaches.insertOne({
    first_name: "Roman",
    last_name: "Tokarev",
    patronymic: "Evgenievich",
    work_experience: 6,
    sport_type: Types_of_sports_2.insertedId
})
let Coaches_5 = db.Coaches.insertOne({
    first_name: "Yuriy",
    last_name: "Azarov",
    patronymic: "Nikolaevich",
    work_experience: 30,
    sport_type: Types_of_sports_1.insertedId
})
let Coaches_6 = db.Coaches.insertOne({
    first_name: "Igor",
    last_name: "Rabskiy",
    patronymic: "Vladimirovich",
    work_experience: 35,
    sport_type: Types_of_sports_3.insertedId
})
let Coaches_7 = db.Coaches.insertOne({
    first_name: "Polina",
    last_name: "Slavinskaya",
    patronymic: "Aleksandrovna",
    work_experience: 8,
    sport_type: Types_of_sports_4.insertedId
})

//----------------------Athletes-------------------------------------------------------------------------------------
let Athletes_1 = db.Athletes.insertOne({
    first_name: "Peter",
    last_name: "Ivanov",
    patronymic: "Mihailovich",
    date_of_birth: new Date("05.06.2002"),
    types_of_sports: [{
        sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_2.insertedId }),
        sports_category: 5,
        coaching_staff: [
            db.Coaches.findOne({ _id: Coaches_1.insertedId }),
            db.Coaches.findOne({ _id: Coaches_4.insertedId }),
        ],
    },
        {
            sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_1.insertedId }),
            sports_category: 4,
            coaching_staff: [
                db.Coaches.findOne({ _id: Coaches_5.insertedId }),
            ],
        }],
    sports_club: "I'MPRESS",
})
let Athletes_2 = db.Athletes.insertOne({
    first_name: "Maxim",
    last_name: "Vorobiev",
    patronymic: "Vitalievich",
    date_of_birth: new Date("12.07.2002"),
    types_of_sports: [{
        sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_3.insertedId }),
        sports_category: 3,
        coaching_staff: [
            db.Coaches.findOne({ _id: Coaches_6.insertedId }),
        ],
    }],
    sports_club: "Maximum",
})
let Athletes_3 = db.Athletes.insertOne({
    first_name: "Egor",
    last_name: "Dereshev",
    patronymic: "Aleksandrovich",
    date_of_birth: new Date("03.04.2003"),
    types_of_sports: [{
        sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_5.insertedId }),
        sports_category: 2,
        coaching_staff: [
            db.Coaches.findOne({ _id: Coaches_3.insertedId }),
        ],
    },
        {
            sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_2.insertedId }),
            sports_category: 5,
            coaching_staff: [
                db.Coaches.findOne({ _id: Coaches_4.insertedId }),
            ],
        }],
    sports_club: "Pulse",
})
let Athletes_4 = db.Athletes.insertOne({
    first_name: "Ekateina",
    last_name: "Sultanova",
    patronymic: "Olegovna",
    date_of_birth: new Date("01.01.2007"),
    types_of_sports: [{
        sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_1.insertedId }),
        sports_category: 1,
        coaching_staff: [
            db.Coaches.findOne({ _id: Coaches_2.insertedId }),
            db.Coaches.findOne({ _id: Coaches_5.insertedId }),
        ],
    },
        {
            sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_2.insertedId }),
            sports_category: 1,
            coaching_staff: [
                db.Coaches.findOne({ _id: Coaches_1.insertedId }),
                db.Coaches.findOne({ _id: Coaches_4.insertedId }),
            ],
        },
        {
            sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_3.insertedId }),
            sports_category: 1,
            coaching_staff: [
                db.Coaches.findOne({ _id: Coaches_6.insertedId }),
            ],
        },
        {
            sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_4.insertedId }),
            sports_category: 1,
            coaching_staff: [
                db.Coaches.findOne({ _id: Coaches_7.insertedId }),
            ],
        },
        {
            sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_5.insertedId }),
            sports_category: 1,
            coaching_staff: [
                db.Coaches.findOne({ _id: Coaches_3.insertedId }),
            ],
        }],
    sports_club: "Pulse",
})
let Athletes_5 = db.Athletes.insertOne({
    first_name: "Danil",
    last_name: "Selen",
    patronymic: "Vasilevich",
    date_of_birth: new Date("10.10.2000"),
    types_of_sports: [{
        sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_4.insertedId }),
        sports_category: 5,
        coaching_staff: [
            db.Coaches.findOne({ _id: Coaches_7.insertedId }),
        ],
    },
        {
            sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_3.insertedId }),
            sports_category: 5,
            coaching_staff: [
                db.Coaches.findOne({ _id: Coaches_6.insertedId }),
            ],
        },
        {
            sport_type: db.Types_of_sports.findOne({ _id: Types_of_sports_1.insertedId }),
            sports_category: 5,
            coaching_staff: [
                db.Coaches.findOne({ _id: Coaches_2.insertedId }),
            ],
        }],
    sports_club: "Green Gorillaz",
})

//----------------------Competitions-------------------------------------------------------------------------------------
let Competitions_1 = db.Competitions.insertOne({
    title: "Kemerovo Bandy Championship",
    date_of_the_event: new Date("07.12.2021"),
    sports_facility: Sports_facilities_3.insertedId,
    sport_type: Types_of_sports_1.insertedId,
    sports_organization: "Start",
    athletes: [
        db.Athletes.findOne({ _id: Athletes_1.insertedId }),
        db.Athletes.findOne({ _id: Athletes_4.insertedId }),
        db.Athletes.findOne({ _id: Athletes_5.insertedId }),
    ]
})
let Competitions_2 = db.Competitions.insertOne({
    title: "Kemerovo Football Championship",
    date_of_the_event: new Date("01.03.2022"),
    sports_facility: Sports_facilities_2.insertedId,
    sport_type: Types_of_sports_2.insertedId,
    sports_organization: "Victory",
    athletes: [
        db.Athletes.findOne({ _id: Athletes_1.insertedId }),
        db.Athletes.findOne({ _id: Athletes_4.insertedId }),
        db.Athletes.findOne({ _id: Athletes_3.insertedId }),
    ]
})
let Competitions_3 = db.Competitions.insertOne({
    title: "Kemerovo Swimming Championship",
    date_of_the_event: new Date("08.09.2020"),
    sports_facility: Sports_facilities_1.insertedId,
    sport_type: Types_of_sports_3.insertedId,
    sports_organization: "Medal",
    athletes: [
        db.Athletes.findOne({ _id: Athletes_2.insertedId }),
        db.Athletes.findOne({ _id: Athletes_4.insertedId }),
        db.Athletes.findOne({ _id: Athletes_5.insertedId }),
    ]
})
let Competitions_4 = db.Competitions.insertOne({
    title: "Kemerovo Running Championship",
    date_of_the_event: new Date("02.03.2020"),
    sports_facility: Sports_facilities_5.insertedId,
    sport_type: Types_of_sports_4.insertedId,
    sports_organization: "Medal",
    athletes: [
        db.Athletes.findOne({ _id: Athletes_4.insertedId }),
        db.Athletes.findOne({ _id: Athletes_5.insertedId }),
    ]
})
let Competitions_5 = db.Competitions.insertOne({
    title: "Kemerovo Weightlifting Championship",
    date_of_the_event: new Date("07.12.2021"),
    sports_facility: Sports_facilities_4.insertedId,
    sport_type: Types_of_sports_5.insertedId,
    sports_organization: "Barbell",
    athletes: [
        db.Athletes.findOne({ _id: Athletes_3.insertedId }),
        db.Athletes.findOne({ _id: Athletes_4.insertedId }),
    ]
})

//----------------------Awards-------------------------------------------------------------------------------------
let Awards_1 = db.Awards.insertOne({
    place_in_competition: 1,
    competition: Competitions_1.insertedId,
    athlet: Athletes_1.insertedId,
})
let Awards_2 = db.Awards.insertOne({
    place_in_competition: 2,
    competition: Competitions_1.insertedId,
    athlet: Athletes_4.insertedId,
})
let Awards_3 = db.Awards.insertOne({
    place_in_competition: 3,
    competition: Competitions_1.insertedId,
    athlet: Athletes_5.insertedId,
})
let Awards_4 = db.Awards.insertOne({
    place_in_competition: 1,
    competition: Competitions_2.insertedId,
    athlet: Athletes_1.insertedId,
})
let Awards_5 = db.Awards.insertOne({
    place_in_competition: 2,
    competition: Competitions_2.insertedId,
    athlet: Athletes_4.insertedId,
})
let Awards_6 = db.Awards.insertOne({
    place_in_competition: 3,
    competition: Competitions_2.insertedId,
    athlet: Athletes_3.insertedId,
})
let Awards_7 = db.Awards.insertOne({
    place_in_competition: 1,
    competition: Competitions_2.insertedId,
    athlet: Athletes_1.insertedId,
})
let Awards_8 = db.Awards.insertOne({
    place_in_competition: 2,
    competition: Competitions_3.insertedId,
    athlet: Athletes_4.insertedId,
})
let Awards_9 = db.Awards.insertOne({
    place_in_competition: 3,
    competition: Competitions_3.insertedId,
    athlet: Athletes_3.insertedId,
})
let Awards_10 = db.Awards.insertOne({
    place_in_competition: 1,
    competition: Competitions_4.insertedId,
    athlet: Athletes_4.insertedId,
})
let Awards_11 = db.Awards.insertOne({
    place_in_competition: 2,
    competition: Competitions_4.insertedId,
    athlet: Athletes_5.insertedId,
})
let Awards_12 = db.Awards.insertOne({
    place_in_competition: 1,
    competition: Competitions_5.insertedId,
    athlet: Athletes_3.insertedId,
})
let Awards_13 = db.Awards.insertOne({
    place_in_competition: 2,
    competition: Competitions_5.insertedId,
    athlet: Athletes_4.insertedId,
})