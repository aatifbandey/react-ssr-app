import { css } from '@emotion/css';


export const singleCard = css`
	display: flex;
	width: 30%;
	border: 1px solid #ccc;
  	margin: 1% 0% 1% 1%;
  	border-radius: 2px;
	border-left: 0px;
	border-top: 0px;
	border-right: 0px;
	padding: 10px;
	font-size: 13px;
	flex-direction: column;
	img {
		width: 100%;
	}
	@media (min-width: 768px) {
		width: 28%;
		font-size: 16px;
    }
`;

export const content = css`
	display: flex;
	flex-direction: column;
	justify-content: start;
	
	width: 100%;
	div {
		word-break: break-all;
		margin: 2% 0 0 0%;
	}
`;
export const imgHolder = css`
	display: flex;
	align-items: center;
	width: 40%;
	margin: 0 0 0 1%;
`;