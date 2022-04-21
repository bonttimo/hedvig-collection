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
		--h3: 1.8rem;
		--h4: 1.14rem;
		--h5: 1rem;
		--h6: 0.87rem; // 14px
		--p: 0.87rem; // 14px
		--a: 0.87rem; // 14px
		--text-default: 1.1rem; // 18px
		--text-large: 1.3rem;
		--text-small: 0.87rem; // 14px
		--text-details: 0.75rem; // 12px
		--text-tiny: 0.625rem; // 10px

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
    h6, .h6 { font-size: var(--h6); font-family: SctoGroteskARegular;  }
	p{ font-size: var(--p); line-height: 145%; }
	a{ font-size: var(--a); font-family: "SctoGroteskARegular"; color: ${({ theme }) => theme.color.darkGray}; }
    strong { font-weight: bolder; font-family: "SctoGroteskARegular"; }
    em { font-style: italic; }
	.uppercase{ text-transform: uppercase; }

	.text-{
		&large{
			font-size: var(--text-large);
		}
		&small{
			font-size: var(--text-small);
		}
		&details{
			font-size: var(--text-details);
		}
		&default{
			font-size: var(--text-default);
		}
	}

	nav{
		a, button{ font-size: var(--text-small); font-family: "SctoGroteskARegular"; }
	}

	footer{
		a{ font-size: var(--p); color: ${({ theme }) => theme.color.offWhite}; font-family: "NoeStandardLight";  }
		h6{ font-size: var(--text-details); font-family: SctoGroteskARegular; }
		.copyright{ font-size: var(--text-details); }
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
		&about{
			.intro{
				p{ font-size: var(--text-large); line-height: 190%; }
			}
			.item{
				p{ font-size: var(--text-default); }
			}
			@media only screen and (max-width: 1000px) {
				main{
					grid-template-columns: 1fr;
					.intro{
						grid-column: 1;
						p{ font-size: var(--text-default); line-height: 190%; }
					}
				}
			}
		}
		&privacy-policy{
			main{
				h6{ font-size: var(--text-details); }
				p, a{ font-size: var(--text-default); }
			}
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
		&imageBlock{
			button a{ font-size: 0.87rem; }
		}
		&imageBlockItem{
			p{ font-size: 1.8rem; }
			button a{ font-size: 0.87rem; }
		}
		&newsletterAndContact{
			.newsletter{
				button{
					font-size: var(--text-tiny);
				}
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

	@media only screen and (max-width: 900px) {
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
