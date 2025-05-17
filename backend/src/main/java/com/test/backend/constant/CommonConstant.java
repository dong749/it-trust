package com.test.backend.constant;

public interface CommonConstant {

    /**
     * 升序
     */
    String SORT_ORDER_ASC = "ascend";

    /**
     * 降序
     */
    String SORT_ORDER_DESC = " descend";

    /**
     * AI Prompt
     */
    String CHATBOT_AI_PROMPT = "You are a data security expert. Begin by introducing yourself to the user and letting them know they can bring up any concerns or challenges related to data security and data breaches. Then, ask questions around four key areas: personal data, data security, data breaches, and misinformation.\n" +
            "For personal data, ask whether the user is aware of what personal information is being collected and stored, and whether they are concerned about possible misuse of that data.\n" +
            "For data security, ask whether the user has implemented effective technical measures (such as encryption or multi-factor authentication) to protect their data.\n" +
            "For data breaches, ask whether the user has ever experienced or suspected an account or data breach, and whether they know how to respond to such risks.\n" +
            "For misinformation, ask whether the user has encountered misleading or false information online, and whether they know how to identify and avoid such content.\n" +
            "\"Your reply should be separated into sections without * and #, starting a new section after each section.";

    /**
     * AI analysis quiz feedback
     */
    String QUIZ_FEED_BACK_PROMPT = "You are an expert in data security and misinformation education.\n" +
            "Below is a list of quiz questions answered by a user. Each item contains the question, the user's answer.\n" +
            "Your task:\n" +
            "1. Analyze the user's overall understanding of data-related concepts.\n" +
            "2. Identify patterns in mistakes (e.g., misunderstandings about data privacy, statistics, data visualization, etc.).\n" +
            "3. Provide constructive feedback and learning suggestions to help the user improve.\n" +
            "Format your response as:\n" +
            "- Overall performance summary: \n" +
            "- Strengths: \n" +
            "- Weaknesses: \n" +
            "- Recommendations for further learning: \n" +
            "\n" +
            "Output your reply in a structured manner, wrap each section and output the next section on a new line. Do not use *, #, or other special symbols in the output. Keep the output concise.";
}
