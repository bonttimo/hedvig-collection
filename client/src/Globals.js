import { createGlobalStyle } from "styled-components";

import NoeStandardLight from "./assets/fonts/NoeStandard-Light.woff2";
import SctoGroteskARegular from "./assets/fonts/SctoGroteskA-Regular.woff2";

export const GlobalStyles = createGlobalStyle`
	*, *::before, *::after{ box-sizing: border-box; }
	ol, ul{list-style: none;}
	img{ max-width: 100%; }
	table{ border-collapse: collapse; }
	textarea{ white-space: revert; }
	*{ position: relative; }
	input, textarea, button{ background-color: transparent; }
	ul, li, textarea, input, select, button, body { outline: none; border: none; }
	body, h1, h2, h3, h4, h5, h6, p, ol, ul { margin: 0; padding: 0; font-weight: normal; }
	ol, ul { list-style: none; }
	a, button{ cursor: pointer; text-decoration: none; }

	::-moz-selection { background: ${({ theme }) => theme.color.darkGray}; color: ${({ theme }) => theme.color.lightGray}; }
	::selection { background: ${({ theme }) => theme.color.darkGray}; color: ${({ theme }) => theme.color.lightGray}; }

	@font-face {
        font-family: SctoGroteskARegular;
        src: url(${SctoGroteskARegular}) format("woff2");
        font-weight: 400;
        font-style: normal;
        font-display: swap;
	}
	@font-face {
        font-family: NoeStandardLight;
        src: url(${NoeStandardLight}) format("woff2");
        font-weight: 200;
        font-style: normal;
        font-display: swap;
	}


	:root {
		--h1: 2rem; // 32px
		--h2: 1.7rem; // 27.2px
		--h3: 1.8125rem; // 29px
		--h4: 1.125rem; // 18px
		--h5: 1rem; // 16px
		--h6: 0.75rem; // 12px

		--text-huge: 1.8125rem; // 29px
		--text-big: 1.375rem; // 22px
		--text-medium: 1.125rem; // 18px
		--text-normal: 1rem; // 16px
		--text-small: 0.875rem; // 14px
		--text-smaller: 0.75rem; // 12px
		--text-tiny: 0.625rem; // 10px
		--p: 1.125rem; // 18px
		--a: 1.125rem; // 18px
		--li: 1.125rem; // 18px
		--button: 0.875rem; // 14px

		--scto: SctoGroteskARegular; 
		--noeStandard: NoeStandardLight; 

		--maxWidth: 2400px;
		--gutter: 7rem;
		--offsetTop: 8rem;
		--borderRadius: 4px;
	}

	#root, #portal{
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	body{ font-family: "NoeStandardLight"; color: ${({ theme }) => theme.color.darkGray}; }
	.scto{ font-family: var(--scto); }
	.noeStandard{ font-family: var(--noeStandard); }

	h1, h2, h3, h4, h5, h6{ font-family: var(--noeStandard); }
	h1, .h1 { font-size: var(--h1); font-family: var(--noeStandard);  }
    h2, .h2 { font-size: var(--h2); font-family: var(--noeStandard);  }
    h3, .h3 { font-size: var(--h3); font-family: var(--noeStandard);  }
    h4, .h4 { font-size: var(--h4); font-family: var(--noeStandard);  }
    h5, .h5 { font-size: var(--h5); font-family: var(--noeStandard);  }
    h6, .h6 { font-size: var(--h6); font-family: var(--scto);  }
	p{ font-size: var(--p); line-height: 155%; }
	a{ font-size: var(--a); font-family: var(--scto); color: ${({ theme }) => theme.color.darkGray}; }
	li{ font-size: var(--li); }
    strong { font-weight: bolder; font-family: var(--scto); }
    em { font-style: italic; }
	.uppercase{ text-transform: uppercase; }

	.text-{
		&huge{
			font-size: var(--text-huge);
		}
		&big{
			font-size: var(--text-big);
		}
		&medium{
			font-size: var(--text-medium);
		}
		&normal{
			font-size: var(--text-normal);
		}
		&small{
			font-size: var(--text-small);
		}
		&smaller{
			font-size: var(--text-smaller);
		}
		&tiny{
			font-size: var(--text-tiny);
		}
	}

	.page-{
		&about{
			@media only screen and (max-width: 1000px) {
				main{
					grid-template-columns: 1fr;
					.intro{
						grid-column: 1;
					}
				}
			}
		}
	}

	img, svg{ width: 100%; max-width: 100%; height: auto; }
	button, a{ cursor: pointer; }
	button{ cursor: pointer; font-size: var(--button); font-family: var(--scto); }

	@media only screen and (max-width: 900px) {
		:root {
			--h3: 1.25rem; // 20px
			--h6: 0.625rem; // 10px
			--p: 0.875rem; // 14px
			--a: 0.875rem; // 14px
			--li: 0.875rem; // 14px

			/* --text-huge: 1.25rem; // 20px */
			--text-huge: 1.5rem; // 20px
			--text-medium: 1rem; // 16px

			--button: 0.625rem; // 10px

			--gutter: 2rem;
			--offsetTop: 2rem;
		}
	}
`;
