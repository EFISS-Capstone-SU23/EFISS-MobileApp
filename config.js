export const config = {
	BE_BASE_API: 'https://dev.efiss.tech',
	IMG_STORAGE_URL: '',
	IS_LOCAL: false,

	SEARCH_ROUTER: 'search/image',
	TEXT_SEARCH_ROUTER: 'search/text?q=:query&pageSize=:pageSize&pageNumber=:pageNum&sortBy=:sortBy',

	BANNER_ADS_ROUTER: 'ads/banner',
	COLLECTIONS_ADD_ROUTER: 'ads/collection',

	SIGNUP_ROUTER: 'auth/sign-up',
	SIGNIN_ROUTER: 'auth/sign-in',
	CHANGE_PASSWORD_ROUTER: 'auth/change-password',
	SEND_RESET_PASSWORD: 'auth/reset-password',
	REFRESH_TOKEN_ROUTER: 'auth/refresh-token',

	GET_BY_ID_ROUTER: 'product',
	RECOMMEND_PRODUCT_ROUTER: 'product/recommend',
	COLLECTIONS_ROUTER: 'normal-user/collections',
	COLLECTION_DETAILS_PAGINATION_ROUTER: 'normal-user/collections/:id/products?pageSize=:pageSize&pageNumber=:pageNum',
	COLLECTION_DETAILS_ROUTER: 'normal-user/collections/:id/products',
	COLLECTIONS_DETAILS_REMOVE_ROUTER: 'normal-user/collections/:collectionId/products/:productId',
	PROFILE_ROUTER: 'normal-user/profile',
	REPORT_BUG: 'normal-user/bug-report',
	VERIFY_EMAIL_ROUTER: 'auth/verify-email/resend',

	LOAD_MORE_BY_URL: 'product/list/by-image-urls',

	PAGE_SIZE: 20,
	DIVERSITY: 1,
	SORT_BY_RELEVANCE: 'relevance',
	SORT_BY_PRICE_ASC: 'price_asc',
	SORT_BY_PRICE_DESC: 'price_desc',
	SORT_BY_DEFAULT: 'default',
};

export const updateBaseApi = (newApi) => {
	config.BE_BASE_API = newApi;
};

export const updateLocalStatus = (newStatus) => {
	config.IS_LOCAL = newStatus;
};

export const updateImgUrl = (newImgUrl) => {
	config.IMG_STORAGE_URL = newImgUrl;
};

export const updatePageSize = (newSize) => {
	config.PAGE_SIZE = newSize;
};

export const updateDiversity = (newDiversity) => {
	config.DIVERSITY = newDiversity;
};
