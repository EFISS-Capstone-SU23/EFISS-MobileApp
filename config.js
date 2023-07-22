export const config = {
	BE_BASE_API: 'https://k8s.efiss.tech',

	SEARCH_ROUTER: 'search/image',

	SIGNUP_ROUTER: 'auth/sign-up',
	SIGNIN_ROUTER: 'auth/sign-in',
	CHANGE_PASSWORD_ROUTER: 'auth/change-password',
	REFRESH_TOKEN_ROUTER: 'auth/refresh-token',

	GET_BY_ID_ROUTER: 'product',
	RECOMMEND_PRODUCT_ROUTER: 'product/recommend',
	COLLECTIONS_ROUTER: 'normal-user/collections',
	COLLECTION_DETAILS_ROUTER: 'normal-user/collections/:id/products?pageSize=:pageSize&pageNumber=:pageNum',
	COLLECTION_DETAILS_ADD_ROUTER: 'normal-user/collections/:id/products',
	PROFILE_ROUTER: 'normal-user/profile',
	REPORT_BUG: 'user/bug-report',

	LOAD_MORE_BY_URL: 'product/list/by-image-urls',

	PAGE_SIZE: 30,
	SORT_BY_RELEVANCE: 'relevance',
	SORT_BY_PRICE_ASC: 'price_asc',
	SORT_BY_PRICE_DESC: 'price_desc',
};
