// backend/legal_database.js

const legalArticles = [
    // =======================================================
    // --- B2C: Workplace Advisor --- (Labor Code)
    // =======================================================
    {
        id: "Labor Code, Article 52",
        topic: "workplace_advisor",
        keywords: ["termination", "fired", "dismissal", "увольнение", "расторжение"],
        text: "Article 52. Grounds for termination of an employment contract at the initiative of the employer. 1. An employment contract with an employee may be terminated... in the following cases: 1) liquidation of the employer... 2) reduction in the number or staff of employees... 3) non-conformity of the employee with the position held... confirmed by the results of certification..."
    },
    {
        id: "Labor Code, Article 85",
        topic: "workplace_advisor",
        keywords: ["holiday", "weekend", "day off", "праздник", "выходной"],
        text: "Article 85. Work on holidays and weekends. Work on holidays and weekends is prohibited. Attraction to work on holidays and weekends is made with the written consent of the employee or at his request on the basis of an act of the employer..."
    },

    // =======================================================
    // --- B2C: Family Law Assistant --- (Marriage & Family Code)
    // =======================================================
    {
        id: "Marriage & Family Code, Article 19",
        topic: "family_law",
        keywords: ["divorce", "dissolution", "развод", "расторжение брака"],
        text: "Article 19. Grounds for termination of marriage (matrimony). 1. The grounds for termination of marriage (matrimony) are: 1) the death or declaration by a court of one of the spouses as deceased; 2) termination of the marriage (matrimony) at the request of one or both spouses..."
    },
    {
        id: "Marriage & Family Code, Article 20",
        topic: "family_law",
        keywords: ["divorce in court", "суд", "court"],
        text: "Article 20. Termination of marriage (matrimony) in court. The termination of a marriage (matrimony) is carried out in court if the spouses have common minor children, or in the absence of the consent of one of the spouses to terminate the marriage..."
    },

    // =======================================================
    // --- B2C: Consumer Rights Protector --- (Law on Consumer Rights)
    // =======================================================
    {
        id: "Law on Consumer Rights, Article 14",
        topic: "consumer_rights",
        keywords: ["return", "exchange", "refund", "возврат", "обмен"],
        text: "Article 14. Right of consumers to exchange or return goods of proper quality. 1. The buyer has the right to exchange a non-food product of proper quality for a similar product from the seller from whom the product was purchased, if the specified product did not fit in shape, size, style, color, size or for other reasons cannot be used by the buyer for its intended purpose. The buyer has the right to exchange a non-food product of proper quality within fourteen days, not counting the day of its purchase."
    },
    {
        id: "Law on Consumer Rights, Article 15",
        topic: "consumer_rights",
        keywords: ["defective", "faulty", "poor quality", "бракованный", "некачественный"],
        text: "Article 15. Rights of the consumer in case of selling goods of improper quality. 1. A consumer to whom a product of improper quality has been sold, if its shortcomings were not stipulated by the seller, has the right to demand at his choice: 1) replacement with a product of a similar brand (model, article); 2) replacement with the same product of another brand (model, article) with a corresponding recalculation of the purchase price; 3) a commensurate reduction in the purchase price; 4) immediate gratuitous elimination of product defects or reimbursement of expenses for their correction..."
    },

    // =======================================================
    // --- B2B: Contract Advisor --- (Civil Code)
    // =======================================================
    {
        id: "Civil Code, Article 380",
        topic: "contract_advisor",
        keywords: ["contract", "agreement", "договор", "соглашение"],
        text: "Article 380. Concept of the contract. 1. A contract is an agreement of two or more persons on the establishment, modification or termination of civil rights and obligations. 2. The rules on bilateral and multilateral transactions provided for in Chapter 4 of this Code shall apply to the contract."
    },

    // =======================================================
    // --- B2B: Corporate Legal Assistant --- (Law on LLPs)
    // =======================================================
    {
        id: "Law on LLPs, Article 2",
        topic: "corporate_assistant",
        keywords: ["llp", "business", "тоо", "company registration", "founding documents"],
        text: "Article 2. Concept of a limited liability partnership. 1. A limited liability partnership is a partnership established by one or several persons, the charter capital of which is divided into shares; the participants of a limited liability partnership are not liable for its obligations and bear the risk of losses associated with the activities of the partnership within the value of their contributions."
    },

];

const findRelevantArticles = (query, topic) => {
    const queryLower = query.toLowerCase();
    const relevant = legalArticles.filter(article => 
        article.topic === topic &&
        article.keywords.some(keyword => queryLower.includes(keyword))
    );
    return relevant;
};

module.exports = { findRelevantArticles };