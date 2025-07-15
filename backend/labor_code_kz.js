const laborCodeArticles = [
    {
        id: "Article 52",
        keywords: ["termination", "fired", "dismissal", "увольнение", "расторжение"],
        text: "Article 52. Grounds for termination of an employment contract at the initiative of the employer. 1. An employment contract with an employee may be terminated at the initiative of the employer in the following cases: 1) liquidation of the employer-legal entity or termination of the activity of the employer-individual; 2) reduction in the number or staff of employees; 3) decrease in the volume of production, work performed and services rendered, which resulted in a deterioration of the economic state of the employer; 4) non-conformity of the employee with the position held or the work performed due to insufficient qualifications, confirmed by the results of certification; ... 24) reaching the retirement age by the employee... with the right to extend the employment contract annually."
    },
    {
        id: "Article 85",
        keywords: ["holiday", "weekend", "day off", "праздник", "выходной"],
        text: "Article 85. Work on holidays and weekends. Work on holidays and weekends is prohibited. Attraction to work on holidays and weekends is made with the written consent of the employee or at his request on the basis of an act of the employer, except for cases provided for in Article 86 of this Code."
    },
    {
        id: "Article 68",
        keywords: ["overtime", "сверхурочно", "over work"],
        text: "Article 68. Overtime work. Overtime work is work performed by an employee at the initiative of the employer in excess of the established duration of working time. Attraction to overtime work is allowed only with the written consent of the employee, except for cases provided for in this Code. Overtime work should not exceed two hours per day for each employee, and one hour for heavy work, work with harmful and (or) dangerous working conditions."
    }
];

const findRelevantArticles = (query) => {
    const queryLower = query.toLowerCase();
    const relevant = laborCodeArticles.filter(article => 
        article.keywords.some(keyword => queryLower.includes(keyword))
    );
    return relevant;
};

module.exports = { findRelevantArticles };