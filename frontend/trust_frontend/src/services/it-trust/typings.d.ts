declare namespace API {
  type AiAnalysisResultVO = {
    aiResponse?: string;
    finishedTime?: string;
    questionCategory?: string;
  };

  type BaseResponseDataLeakedByStateResponseVO_ = {
    code?: number;
    data?: DataLeakedByStateResponseVO;
    message?: string;
  };

  type BaseResponseListAiAnalysisResultVO_ = {
    code?: number;
    data?: AiAnalysisResultVO[];
    message?: string;
  };

  type BaseResponseListBreachLogVO_ = {
    code?: number;
    data?: BreachLogVO[];
    message?: string;
  };

  type BaseResponseListDataLeakByTypeReportVO_ = {
    code?: number;
    data?: DataLeakByTypeReportVO[];
    message?: string;
  };

  type BaseResponseListHIBPBreachDTO_ = {
    code?: number;
    data?: HIBPBreachDTO[];
    message?: string;
  };

  type BaseResponseListQuestionVO_ = {
    code?: number;
    data?: QuestionVO[];
    message?: string;
  };

  type BaseResponseString_ = {
    code?: number;
    data?: string;
    message?: string;
  };

  type BaseResponseUserQuizSubmitVO_ = {
    code?: number;
    data?: UserQuizSubmitVO;
    message?: string;
  };

  type BreachLogVO = {
    count?: number;
    isBreach?: number;
  };

  type chatBotResponseUsingGETParams = {
    /** userInput */
    userInput: string;
  };

  type DataLeakByTypeReportVO = {
    count?: number;
    percentage?: number;
    type?: string;
  };

  type DataLeakedByStateDTO = {
    leakType?: string;
    state?: string;
  };

  type DataLeakedByStateResponseVO = {
    dataLeakedByStateStatistics?: DataLeakedByStateStatisticsVO;
    dataLeakedByStates?: DataLeakedByStateVO[];
  };

  type DataLeakedByStateStatisticsVO = {
    average?: number;
    max?: number;
    min?: number;
    sum?: number;
  };

  type DataLeakedByStateVO = {
    leaktype?: string;
    reports?: number;
    state?: string;
    year?: string;
  };

  type detectBreachUsingGETParams = {
    /** email */
    email: string;
  };

  type getPrivacyBreachDistributionUsingGETParams = {
    /** year */
    year: number;
  };

  type getQuestionByTypeUsingGETParams = {
    /** category */
    category: string;
  };

  type HIBPBreachDTO = {
    breachDate?: string;
    dataTypes?: string[];
    description?: string;
    domain?: string;
    logoUrl?: string;
    title?: string;
  };

  type QuestionVO = {
    optionA?: string;
    optionB?: string;
    optionC?: string;
    optionD?: string;
    questionDetails?: string;
    questionId?: number;
    questionType?: number;
  };

  type UserQuizBatchSubmitDTO = {
    quizList?: UserQuizSubmitDTO[];
  };

  type UserQuizSubmitDTO = {
    questionId?: number;
    userSelectedOption?: string;
  };

  type UserQuizSubmitVO = {
    explanation?: string;
    id?: number;
    isCorrect?: boolean;
    rightAnswer?: string;
  };
}
