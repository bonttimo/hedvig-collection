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
		--h1: 2rem;
		--h2: 1.7rem;
		--h3: 1.4rem;
		--h4: 1.2rem;
		--h5: 1rem;
		--h6: 0.8rem;
		--p: 1rem;
		--a: 1rem;
		--text-large: 1.3rem;
		--text-small: 0.8rem;
		--text-details: 0.7rem;

		--maxWidth: 2400px;
		--gutter: 6rem;
		--offsetTop: 6rem;
		--borderRadius: 4px;
	}

	body{ font-family: "NoeStandardLight"; color: ${({ theme }) => theme.color.darkGray}; }
	.scto{ font-family: SctoGroteskARegular; }
	.noeStandard{ font-family: "NoeStandardLight"; }

	h1, h2, h3, h4, h5, h6{ font-family: "NoeStandardLight"; }
	h1, .h1 { font-size: var(--h1); }
    h2, .h2 { font-size: var(--h2); }
    h3, .h3 { font-size: var(--h3); }
    h4, .h4 { font-size: var(--h4); }
    h5, .h5 { font-size: var(--h5); }
    h6, .h6 { font-size: var(--h6); }
	p{ font-size: var(--p); line-height: 145%; }
	a{ font-size: var(--a); font-family: "SctoGroteskARegular"; color: ${({ theme }) => theme.color.darkGray}; }
    strong { font-weight: bolder; font-family: "SctoGroteskARegular"; }
    em { font-style: italic; }

	.text-{
		&large{
			font-size: var(--text-large);
		}
		&small{
			font-size: var(--text-small);
			text-transform: uppercase;
		}
		&details{
			font-size: var(--text-details);
			text-transform: uppercase;
		}
	}

	nav{
		a, button{ font-size: var(--text-small); font-family: "SctoGroteskARegular"; }
	}

	footer{
		a{ font-size: var(--text-details); color: ${({ theme }) => theme.color.offWhite};  }
	}

	.page-{
		&privacy-policy{
			p{ font-size: var(--text-large); }
		}
		&product{
			.product-status{
				p, a{ font-size: var(--text-details); font-family: "SctoGroteskARegular"; } 
			}
		}
		&cart{
			p, a, span{ font-family: "SctoGroteskARegular"; }
		}
	}

	.component-{
		&product{
			p, a{ font-size: var(--text-details); font-family: "SctoGroteskARegular"; } 
		}
		&bag{
			.products{
				p, a, span{ font-size: var(--text-details); font-family: "SctoGroteskARegular"; }
			}
		}
	}

	img, svg{
		width: 100%;
		max-width: 100%;
		height: auto;
	}
	button, a{
		cursor: pointer;
	}

	@media only screen and (max-width: 824px) {
		:root {
			--gutter: 2rem;
			--offsetTop: 2rem;
			--p: 0.85rem;
			--a: 0.85rem;
			--h5: 0.85rem;
		}
	}

	@media only screen and (max-width: 784px) {
		
	}
`;
