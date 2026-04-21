// IKIPI Data Store - Rwanda Premier League (RPL) Mock Data
// In production, this connects to PostgreSQL via DATABASE_URL

const teams = [
  {
    id: 1, name: "APR FC", shortName: "APR", founded: 1936,
    logo: "🔴", primaryColor: "#CC0000", secondaryColor: "#FFD700",
    stadium: "Amahoro National Stadium", city: "Kigali",
    coach: "Thierry Hitimana", trophies: 18,
    description: "The most successful club in Rwandan football history, Army football club of Rwanda",
    wins: 14, draws: 4, losses: 2, goalsFor: 42, goalsAgainst: 14, points: 46,
    form: ["W","W","D","W","W"]
  },
  {
    id: 2, name: "Rayon Sports FC", shortName: "RAY", founded: 1966,
    logo: "🔵", primaryColor: "#003DA5", secondaryColor: "#FFFFFF",
    stadium: "Kigali Pele Stadium", city: "Kigali",
    coach: "André Casa Mbungo", trophies: 11,
    description: "One of the oldest and most beloved clubs in Rwanda with a massive fan base",
    wins: 13, draws: 4, losses: 3, goalsFor: 38, goalsAgainst: 18, points: 43,
    form: ["W","L","W","W","D"]
  },
  {
    id: 3, name: "Police FC", shortName: "POL", founded: 2012,
    logo: "🟦", primaryColor: "#003399", secondaryColor: "#FF6600",
    stadium: "Nyamirambo Stadium", city: "Kigali",
    coach: "Claude Niyomugabo", trophies: 2,
    description: "Rwanda National Police football club, rapidly rising force in Rwandan football",
    wins: 10, draws: 5, losses: 5, goalsFor: 31, goalsAgainst: 22, points: 35,
    form: ["D","W","W","L","W"]
  },
  {
    id: 4, name: "AS Kigali", shortName: "ASK", founded: 1969,
    logo: "🟢", primaryColor: "#006400", secondaryColor: "#FFD700",
    stadium: "Kigali Stadium Annexe", city: "Kigali",
    coach: "Micho Sredojevic", trophies: 3,
    description: "Proud Kigali club with a rich history and passionate supporters",
    wins: 9, draws: 5, losses: 6, goalsFor: 29, goalsAgainst: 25, points: 32,
    form: ["W","D","L","W","D"]
  },
  {
    id: 5, name: "Mukura Victory Sports", shortName: "MVS", founded: 1968,
    logo: "⚫", primaryColor: "#000000", secondaryColor: "#FF0000",
    stadium: "Umuganda Stadium", city: "Huye",
    coach: "Etienne Ndayiragije", trophies: 5,
    description: "Southern Rwanda's powerhouse club, known for developing local talent",
    wins: 8, draws: 6, losses: 6, goalsFor: 26, goalsAgainst: 24, points: 30,
    form: ["D","W","D","W","L"]
  },
  {
    id: 6, name: "SC Kiyovu", shortName: "KIY", founded: 1966,
    logo: "🟡", primaryColor: "#FFD700", secondaryColor: "#000000",
    stadium: "Kiyovu Sports Complex", city: "Kigali",
    coach: "Jean Claude Rwigema", trophies: 4,
    description: "Traditional Kigali club with loyal fans and strong youth academy",
    wins: 7, draws: 5, losses: 8, goalsFor: 22, goalsAgainst: 28, points: 26,
    form: ["L","W","D","L","W"]
  },
  {
    id: 7, name: "Gorilla FC", shortName: "GOR", founded: 2019,
    logo: "🦍", primaryColor: "#4A235A", secondaryColor: "#1ABC9C",
    stadium: "Kigali Arena Ground", city: "Kigali",
    coach: "Patrick Nshimiyimana", trophies: 0,
    description: "Exciting new club inspired by Rwanda's famous mountain gorillas, focusing on youth",
    wins: 6, draws: 5, losses: 9, goalsFor: 20, goalsAgainst: 30, points: 23,
    form: ["L","D","W","L","W"]
  },
  {
    id: 8, name: "Marines FC", shortName: "MAR", founded: 2001,
    logo: "⚓", primaryColor: "#003366", secondaryColor: "#FFFFFF",
    stadium: "Rubavu Stadium", city: "Rubavu",
    coach: "Gilbert Mugisha", trophies: 0,
    description: "Western Rwanda's representative in the premier league, known for fighting spirit",
    wins: 5, draws: 4, losses: 11, goalsFor: 17, goalsAgainst: 35, points: 19,
    form: ["L","L","W","D","L"]
  }
];

const players = [
  // APR FC
  { id: 1, name: "Olivier Niyonzima", teamId: 1, team: "APR FC", position: "GK", age: 27, nationality: "Rwanda", goals: 0, assists: 0, rating: 7.8, caps: 45, marketValue: "80,000 USD", bio: "Rwanda's first choice goalkeeper, commanding presence in the box" },
  { id: 2, name: "Jacques Tuyisenge", teamId: 1, team: "APR FC", position: "FW", age: 29, nationality: "Rwanda", goals: 18, assists: 5, rating: 8.9, caps: 67, marketValue: "350,000 USD", bio: "Rwanda's greatest striker, top scorer legend of the RPL" },
  { id: 3, name: "Abdou Ruzibiza", teamId: 1, team: "APR FC", position: "MF", age: 24, nationality: "Rwanda", goals: 7, assists: 12, rating: 8.2, caps: 23, marketValue: "180,000 USD", bio: "Creative midfielder with exceptional vision and passing range" },
  { id: 4, name: "Jean Baptiste Mugiraneza", teamId: 1, team: "APR FC", position: "DF", age: 26, nationality: "Rwanda", goals: 2, assists: 3, rating: 7.9, caps: 31, marketValue: "120,000 USD", bio: "Rock-solid centre-back, leader of APR's mean defence" },
  
  // Rayon Sports
  { id: 5, name: "Meddie Kagere", teamId: 2, team: "Rayon Sports FC", position: "FW", age: 33, nationality: "Uganda", goals: 15, assists: 4, rating: 8.7, caps: 0, marketValue: "200,000 USD", bio: "Ugandan legend who became a Rwandan football icon at Rayon Sports" },
  { id: 6, name: "Emery Bayisenge", teamId: 2, team: "Rayon Sports FC", position: "MF", age: 25, nationality: "Rwanda", goals: 6, assists: 9, rating: 8.0, caps: 18, marketValue: "150,000 USD", bio: "Dynamic box-to-box midfielder who energises Rayon's midfield" },
  { id: 7, name: "Djihad Bizimana", teamId: 2, team: "Rayon Sports FC", position: "DF", age: 28, nationality: "Rwanda", goals: 1, assists: 2, rating: 7.7, caps: 22, marketValue: "100,000 USD", bio: "Versatile defender who can play anywhere across the backline" },

  // Police FC
  { id: 8, name: "Hassan Natukunda", teamId: 3, team: "Police FC", position: "FW", age: 22, nationality: "Rwanda", goals: 11, assists: 3, rating: 7.9, caps: 8, marketValue: "90,000 USD", bio: "Young and explosive forward emerging as Rwanda's next great striker" },
  { id: 9, name: "Yannick Mukunzi", teamId: 3, team: "Police FC", position: "MF", age: 24, nationality: "Rwanda", goals: 4, assists: 8, rating: 7.6, caps: 5, marketValue: "75,000 USD", bio: "Industrious midfielder providing energy and drive in the centre" },

  // AS Kigali
  { id: 10, name: "Etienne Nzisabira", teamId: 4, team: "AS Kigali", position: "FW", age: 26, nationality: "Rwanda", goals: 10, assists: 2, rating: 7.8, caps: 12, marketValue: "110,000 USD", bio: "Clever striker with great movement and finishing ability" },
  
  // Mukura Victory
  { id: 11, name: "Innocent Nshuti", teamId: 5, team: "Mukura Victory Sports", position: "MF", age: 23, nationality: "Rwanda", goals: 5, assists: 11, rating: 7.7, caps: 7, marketValue: "85,000 USD", bio: "Gifted playmaker who orchestrates Mukura's attacking football" },
];

const matches = [
  // Recent results
  { id: 1, homeTeam: "APR FC", awayTeam: "Rayon Sports FC", homeScore: 2, awayScore: 1, date: "2025-04-12", status: "completed", competition: "RPL", stadium: "Amahoro National Stadium", attendance: 15000, scorers: ["Tuyisenge 23'", "Mugiraneza 67'", "Kagere 88'"] },
  { id: 2, homeTeam: "Police FC", awayTeam: "AS Kigali", homeScore: 1, awayScore: 1, date: "2025-04-13", status: "completed", competition: "RPL", stadium: "Nyamirambo Stadium", attendance: 8000, scorers: ["Natukunda 45'", "Nzisabira 78'"] },
  { id: 3, homeTeam: "Mukura Victory Sports", awayTeam: "SC Kiyovu", homeScore: 3, awayScore: 0, date: "2025-04-14", status: "completed", competition: "RPL", stadium: "Umuganda Stadium", attendance: 6000, scorers: ["Nshuti 12'", "Nshuti 56'", "Ndayiragije 89'"] },
  { id: 4, homeTeam: "APR FC", awayTeam: "Police FC", homeScore: 3, awayScore: 1, date: "2025-04-19", status: "completed", competition: "RPL", stadium: "Amahoro National Stadium", attendance: 18000, scorers: ["Tuyisenge 10'", "Ruzibiza 35'", "Mugiraneza 70'", "Natukunda 82'"] },
  { id: 5, homeTeam: "Rayon Sports FC", awayTeam: "Gorilla FC", homeScore: 2, awayScore: 0, date: "2025-04-20", status: "completed", competition: "RPL", stadium: "Kigali Pele Stadium", attendance: 11000, scorers: ["Kagere 34'", "Bayisenge 71'"] },
  
  // Upcoming
  { id: 6, homeTeam: "APR FC", awayTeam: "Mukura Victory Sports", homeScore: null, awayScore: null, date: "2025-04-27", status: "upcoming", competition: "RPL", stadium: "Amahoro National Stadium", attendance: null, scorers: [] },
  { id: 7, homeTeam: "Rayon Sports FC", awayTeam: "AS Kigali", homeScore: null, awayScore: null, date: "2025-04-27", status: "upcoming", competition: "RPL", stadium: "Kigali Pele Stadium", attendance: null, scorers: [] },
  { id: 8, homeTeam: "Police FC", awayTeam: "SC Kiyovu", homeScore: null, awayScore: null, date: "2025-04-28", status: "upcoming", competition: "RPL", stadium: "Nyamirambo Stadium", attendance: null, scorers: [] },
  { id: 9, homeTeam: "Gorilla FC", awayTeam: "Marines FC", homeScore: null, awayScore: null, date: "2025-04-28", status: "upcoming", competition: "RPL", stadium: "Kigali Arena Ground", attendance: null, scorers: [] },
  
  // Rwanda Cup
  { id: 10, homeTeam: "APR FC", awayTeam: "Rayon Sports FC", homeScore: null, awayScore: null, date: "2025-05-10", status: "upcoming", competition: "Rwanda Cup Semi-Final", stadium: "Amahoro National Stadium", attendance: null, scorers: [] },
];

const news = [
  { id: 1, title: "Tuyisenge Breaks All-Time RPL Scoring Record", category: "Breaking News", date: "2025-04-20", summary: "Jacques Tuyisenge netted his 18th goal of the season to surpass the legendary scoring record set in 2018. The APR FC striker celebrated with teammates and 18,000 fans at Amahoro.", author: "Keza Uwimana", readTime: "3 min", featured: true },
  { id: 2, title: "Gorilla FC Signs Promising 18-Year-Old from Gisenyi", category: "Transfer News", date: "2025-04-18", summary: "Newly promoted Gorilla FC have secured the signing of Emmanuel Habimana, described by scouts as the most talented teenager in Rwanda. The forward signed a 3-year deal.", author: "Patrick Nsabimana", readTime: "2 min", featured: false },
  { id: 3, title: "Rwanda U-20 Qualify for AFCON Youth Championship", category: "National Team", date: "2025-04-16", summary: "The Amavubi Stars Under-20 team qualified for the African Cup of Nations Youth Championship with a brilliant 2-0 win over Uganda in Kampala. Fans celebrate across Kigali.", author: "Alice Mukamana", readTime: "4 min", featured: true },
  { id: 4, title: "New 30,000-Seat Kigali Football Stadium Plans Unveiled", category: "Infrastructure", date: "2025-04-14", summary: "Rwanda Football Federation and Kigali City have unveiled ambitious plans for a 30,000-seat modern stadium to be built in the Gisozi area, expected to be completed by 2027.", author: "David Mutabazi", readTime: "5 min", featured: false },
  { id: 5, title: "Kagere Announces Retirement Plans After This Season", category: "Player News", date: "2025-04-12", summary: "Ugandan-born Rayon Sports legend Meddie Kagere announced he will hang up his boots at the end of the current RPL season after 11 incredible years in Rwanda.", author: "Solange Muhirwa", readTime: "4 min", featured: true },
  { id: 6, title: "Police FC Launch Community Football Programme in Gasabo", category: "Community", date: "2025-04-10", summary: "Police FC partnered with Gasabo District to launch free football training for children aged 8-16. 200 youngsters registered on the first day at the programme launch.", author: "Théophile Niyonzima", readTime: "3 min", featured: false },
];

const transfers = [
  { id: 1, player: "Jean Pierre Nkurunziza", from: "SC Kiyovu", to: "APR FC", fee: "45,000 USD", date: "2025-03-01", type: "Permanent", status: "completed" },
  { id: 2, player: "Emmanuel Habimana", from: "Gisenyi FC", to: "Gorilla FC", fee: "Free", date: "2025-04-18", type: "Permanent", status: "completed" },
  { id: 3, player: "Thierry Mugwaneza", from: "Rayon Sports FC", to: "TP Mazembe (DRC)", fee: "150,000 USD", date: "2025-02-15", type: "Permanent", status: "completed" },
  { id: 4, player: "Alain Ndorimana", from: "KCCA FC (Uganda)", to: "APR FC", fee: "30,000 USD", date: "2025-01-10", type: "Loan", status: "completed" },
  { id: 5, player: "Freddy Sibomana", from: "AS Kigali", to: "Unknown", fee: "Undisclosed", date: "2025-04-22", type: "Permanent", status: "rumour" },
];

module.exports = { teams, players, matches, news, transfers };
