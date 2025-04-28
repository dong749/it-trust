declare namespace API {
  type BaseResponseListBreachLogVO_ = {
    code?: number;
    data?: BreachLogVO[];
    message?: string;
  };

  type BaseResponseListHIBPBreachDTO_ = {
    code?: number;
    data?: HIBPBreachDTO[];
    message?: string;
  };

  type BaseResponseListQuestionBody_ = {
    code?: number;
    data?: QuestionBody[];
    message?: string;
  };

  type BaseResponseListQuestionVO_ = {
    code?: number;
    data?: QuestionVO[];
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

  type detectBreachUsingGETParams = {
    /** email */
    email: string;
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

  type judgeQuizUsingPOSTParams = {
    /** userQuizSubmitDTO */
    userQuizSubmitDTO: string;
  };

  type QuestionBody = {
    id?: number;
    isDelete?: number;
    questionCategory?: string;
    questionDetails?: string;
    questionType?: number;
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

  type UserQuizSubmitVO = {
    explanation?: string;
    id?: number;
    isCorrect?: boolean;
    rightAnswer?: string;
  };
}
