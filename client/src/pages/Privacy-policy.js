import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

import { pageTransition } from "../FramerMotion";

const PrivacyPolicy = () => {
    const [pageLoading, setPageLoading] = useState(false);
    const { hash } = useLocation();

    const scrollToTarget = (element) => {
        let target;

        if (element instanceof HTMLElement) {
            target = element;
        } else if (element.target.id) {
            target = document.querySelector(element.target.id);
        } else if (element.target.href) {
            target = document.querySelector(window.location.hash);
        } else if (element.target.dataset.target) {
            target = document.querySelector(element.target.dataset.target);
        }

        const rect = target.getBoundingClientRect();
        const offset = -90;
        const scrollTo = rect.top + window.scrollY;

        window.scrollTo({
            top: scrollTo + offset,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        if (hash !== "") {
            if (pageLoading === false) {
                setTimeout(() => {
                    const element = document.getElementById(hash.replace("#", ""));
                    if (element) scrollToTarget(element);
                }, 200);
            }
        }
    }, []);

    return (
        <Container className="page-privacy-policy" initial="enter" animate="animate" exit="exit" variants={pageTransition}>
            <Content>
                <Aside>
                    <h6>Shipping & Privacy</h6>
                    <button onClick={scrollToTarget} data-target="#refund-policy">
                        Refund Policy
                    </button>
                    <button onClick={scrollToTarget} data-target="#pre-order">
                        Pre-order
                    </button>
                    <button onClick={scrollToTarget} data-target="#privacy-policy">
                        Privacy Policy
                    </button>
                    <button onClick={scrollToTarget} data-target="#terms-of-service">
                        Terms of service
                    </button>
                    <button onClick={scrollToTarget} data-target="#shipping-and-deliveries">
                        Shipping & Deliveries
                    </button>
                </Aside>
                <Main>
                    <section id="refund-policy">
                        <div className="set">
                            <h6>Returns</h6>
                            <p>We hope you are happy with your HEDVIG purchase. If for any reason whatsoever, you are not satisfied with your order, you can return purchased items within fourteen (14) days from the date you receive them. Please email us at info@hedvigcollection.com. The products must be returned complete and unused in their original packaging and with all tags attached. After receiving the return instructions the package must me dispatched within 5 working days.</p>
                        </div>
                        <div className="set">
                            <h6>Refunds</h6>
                            <p>Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. Unfortunately HEDVIG can not offer free returns at this time. However we will refund return costs if the product we have sent you is incorrect or faulty. Refund times depend on your credit or debit card company.</p>

                            <p>Please note all sale items are final sale</p>
                        </div>
                        <div className="set">
                            <h6>Exchanges</h6>
                            <p>We do not administer exchanges of items that are purchased online. If you want to purchase a different item, another size or color – please return the purchased item and place a new order in the online store.</p>
                        </div>
                    </section>

                    <section id="pre-order">
                        <div className="set">
                            <h6>Pre-order</h6>
                            <p>A pre-order gives you the chance to reserve and buy an item before it’s in stock. These items have a “Pre order” button, instead of an “Add to cart” one. Generally expect 2-4 weeks of delivery time after preordering. You will get HEDVIG conformation email shortly after the item you pre-ordered is available. If you order products that are in-stock along with pre-order items, you will receive multiple shipments, we will ship you the in-stock item as soon as possible, and the pre-order item when it becomes available.</p>
                        </div>
                    </section>

                    <section id="privacy-policy">
                        <div className="set">
                            <h6>Privacy Policy</h6>
                            <p>This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from hedvigcollection.com.</p>
                        </div>
                        <div className="set">
                            <h6>personal information we collect</h6>
                            <p>When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as “Device Information”.</p>

                            <p>We collect Device Information using the following technologies: </p>

                            <ul>
                                <li>
                                    “Cookies” are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit <a href="https://www.allaboutcookies.org/verify">allaboutcookies.</a>
                                </li>
                                <li>“Log files” track actions occurring on the Site, and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
                                <li>“Web beacons”, “tags”, and “pixels” are electronic files used to record information about how you browse the Site.</li>
                            </ul>

                            <p>Additionally when you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers, email address, and phone number. We refer to this information as “Order Information”.</p>

                            <p>When we talk about “Personal Information” in this Privacy Policy, we are talking both about Device Information and Order Information.</p>
                        </div>

                        <div className="set">
                            <h6>How do we use your personal information?</h6>
                            <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations). Additionally, we use this Order Information to</p>

                            <ul>
                                <li>Communicate with you;</li>
                                <li>Screen our orders for potential risk or fraud; and</li>
                                <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
                            </ul>
                            <p>We use the Device Information that we collect to help us screen for potential risk and fraud (in particular, your IP address), and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site, and to assess the success of our marketing and advertising campaigns).</p>
                        </div>

                        <div className="set">
                            <h6>Sharing your personal information</h6>
                            <p>
                                We share your Personal Information with third parties to help us use your Personal Information, as described above. For example, we use Shopify to power our online store--you can read more about how Shopify uses your Personal Information here: <a href="https://www.shopify.com/legal/privacy">Shopify</a>. We also use Google Analytics to help us understand how our customers use the Site -- you can read more about how Google uses your Personal Information here: <a href="https://policies.google.com/privacy?hl=en">Google privacy</a>. You can also opt-out of Google
                                Analytics here: <a href="https://tools.google.com/dlpage/gaoptout">Tools google.</a>
                            </p>
                            <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>
                        </div>

                        <div className="set">
                            <h6>Behavioural advertising</h6>
                            <p>
                                As described above, we use your Personal Information to provide you with targeted advertisements or marketing communications we believe may be of interest to you. For more information about how targeted advertising works, you can visit the Network Advertising Initiative’s (“NAI”) educational page at <a href="https://thenai.org/about-online-advertising/faq/?tab=2">Network advertising</a>
                            </p>

                            <p>You can opt out of targeted advertising by using the links below:</p>
                            <ul>
                                <li>
                                    Facebook: <a href="https://www.facebook.com/settings/?tab=ads">Facebook settings</a>
                                </li>
                                <li>
                                    Google: <a href="https://www.google.com/settings/ads/anonymous ">Google settings</a>
                                </li>
                                <li>
                                    Bing: <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads">Microsoft advertise</a>
                                </li>
                            </ul>
                            <p>
                                Additionally, you can opt out of some of these services by visiting the Digital Advertising Alliance’s opt-out portal at: <a href="hhttp://optout.aboutads.info/">Optout aboutads</a>.
                            </p>
                        </div>

                        <div className="set">
                            <h6>Do not track</h6>
                            <p>Please note that we do not alter our Site’s data collection and use practices when we see a Do Not Track signal from your browser.</p>
                        </div>

                        <div className="set">
                            <h6>Your rights</h6>
                            <p>If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information.</p>
                            <p>Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.</p>
                        </div>

                        <div className="set">
                            <h6>Data retention</h6>
                            <p>When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.</p>
                        </div>

                        <div className="set">
                            <h6>Changes</h6>
                            <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
                        </div>

                        <div className="set">
                            <h6>Minors</h6>
                            <p>HEDVIG does not wish to collect personal information from anyone under the age of sixteen (16). If you are under eighteen (18), we require that you inform and get your parents’ or guardians’ consent before purchasing anything or provide any personal data to us at www.hedvigcollection.com or any other website related to HEDVIG.</p>
                        </div>

                        <div className="set">
                            <h6>Newsletter subscibes</h6>
                            <p>If you have subscribed to our newsletters, we will use your email to send out the newsletter. Your IP-address will also be collected in order to send marketing based on geographic location, such as country or city. The legal basis for this processing is that it is necessary to fulfil a contractual obligation, namely the providing of the newsletter. The newsletter will be sent to you until you unsubscribe to the service.</p>
                            <p>Direct marketing, other than the newsletter itself can be sent to newsletter subscribers on the same basis as Etail and Retail customers who are not Account Holders.</p>
                        </div>
                    </section>

                    <section id="terms-of-service">
                        <div className="set">
                            <h6>Terms of service</h6>
                            <h6>Overview</h6>
                            <p>This website is operated by Hedvig Collection OY. Throughout the site, the terms “we”, “us” and “our” refer to Hedvig Collection Oy. Hedvig Collection Oy offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
                            <p>By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.</p>
                            <p>Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.</p>
                            <p>Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.</p>
                            <p>Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.</p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 1 - online store terms</h6>
                            <p>
                                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You must not transmit any worms or viruses or any code of a destructive
                                nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.
                            </p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 2 - general conditions</h6>
                            <p>
                                We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on
                                the website through which the service is provided, without express written permission by us. The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
                            </p>
                        </div>
                        <div className="set">
                            <h6 className="uppercase">Section 3 - accuracy, completeness and timeliness of information</h6>
                            <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.</p>
                            <p>This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.</p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 4 - modifications to the service and prices</h6>
                            <p>Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 5 - products or services (if applicable)</h6>
                            <p>Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy.</p>
                            <p>
                                We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate. We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change
                                at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited. We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
                            </p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 6 - accuracy of billing and account information</h6>
                            <p>
                                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or
                                prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers or distributors.
                            </p>
                            <p>You agree to provide current, complete and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.</p>
                            <p>For more detail, please review our Returns Policy</p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 7 - optional tools</h6>
                            <p>We may provide you with access to third-party tools over which we neither monitor nor have any control nor input.</p>
                            <p>
                                You acknowledge and agree that we provide access to such tools ”as is” and “as available” without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools. Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s). We may also, in the future,
                                offer new services and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.
                            </p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 8 - third-party links</h6>
                            <p>
                                Certain content, products and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties. We are not liable for any harm or damages related to the purchase or use of goods, services,
                                resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
                            </p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 9 - user comments, feedback and other submissions</h6>
                            <p>
                                If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any
                                comments; or (3) to respond to any comments.
                            </p>
                            <p>
                                We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene or otherwise objectionable or violates any party’s intellectual property or these Terms of Service. You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive or obscene
                                material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false e mail address, pretend to be someone other than yourself, or otherwise mislead us or third-parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third-party.
                            </p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 10 - personal information</h6>
                            <p>Your submission of personal information through the store is governed by our Privacy Policy. To view our Privacy Policy.</p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 11 - errors, inaccuracies and omissions</h6>
                            <p>Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order).</p>
                            <p>We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website, should be taken to indicate that all information in the Service or on any related website has been modified or updated.</p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 12 - prohibited uses</h6>
                            <p>
                                In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual
                                orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security
                                features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.
                            </p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 13 - disclaimer of warranties; limitation of liability</h6>
                            <p>
                                We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable. You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you. You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are
                                (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement. In no case shall ennos-studio, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental,
                                punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a
                                result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
                            </p>
                            <p></p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 14 - indemnification</h6>
                            <p>You agree to indemnify, defend and hold harmless ennos-studio and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.</p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 15 - severability</h6>
                            <p>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.</p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 16 - termination</h6>
                            <p>
                                The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes. These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site. If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time
                                without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).
                            </p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 17 - entire agreement</h6>
                            <p>
                                of Service shall not constitute a waiver of such right or provision. These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service). Any ambiguities in the interpretation of these Terms of Service shall not
                                be construed against the drafting party.
                            </p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 18 - governing law</h6>
                            <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Finland.</p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 19 - changes to terms of service</h6>
                            <p>You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</p>
                        </div>

                        <div className="set">
                            <h6 className="uppercase">Section 20 - contact information</h6>
                            <p>Questions about the Terms of Service should be sent to us at</p>
                            <a href="mailto:info@hedvigcollection.com">info@hedvigcollection.com</a>
                        </div>
                    </section>

                    <section id="shipping-and-deliveries">
                        <div className="set">
                            <h6>Shipping and deliveries</h6>
                            <p>We are based in Finland and all our products are shipped from our Helsinki studio to the customer. Free shipping on all orders above €500.</p>
                            <p>Shipping to Finland:</p>
                            <ul>
                                <li>Posti & PostNord: 6 € (delivery time 2-3 business days) Shipping to close Eu region (Denmark, Estonia, Latvia, Lithuania & Sweden):</li>
                                <li>PostNord 10e (delivery time 2-3 business days)</li>
                            </ul>
                            <p>Shipping to EU region (Austria, Belgium, Bulgaria, Croatia, Cyprus, Czechia, France, Germany, Greece, Hungary, Ireland, Italy, Luxembourg, Monaco, Netherlands, Poland, Portugal, Romania, Slovakia, Slovenia & Spain, Denmark, Estonia, Latvia, Lithuania & Sweden):</p>
                            <ul>
                                <li>UPS Express Saver 15e (delivery time 2-3 business days)</li>
                                <li>UPS Standard 20e (delivery time 2-6 business days)</li>
                            </ul>
                        </div>
                    </section>
                </Main>
            </Content>
        </Container>
    );
};

export default PrivacyPolicy;

const Container = styled(motion.section)`
    min-height: 100vh;
    background-color: ${({ theme }) => theme.color.offWhite};
    display: flex;
    flex-direction: column;

    aside {
        button {
            font-size: var(--text-huge);
            font-family: var(--noeStandard);
        }
    }

    @media only screen and (max-width: 900px) {
        aside {
            h6 {
                font-size: 0.75rem;
            }
        }
    }
`;

const Content = styled.section`
    max-width: var(--maxWidth);
    padding: 0 var(--gutter);
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;

    @media only screen and (max-width: 784px) {
        grid-template-columns: 1fr;
        margin-top: 50px;
    }
`;

const Aside = styled.aside`
    display: flex;
    align-self: flex-start;
    overflow-y: auto;
    flex-direction: column;
    align-content: flex-start;
    align-items: flex-start;
    position: sticky;
    width: 100%;

    * {
        margin-bottom: 1rem;
        &:last-child {
            margin-bottom: 0;
        }
    }
    h6 {
        margin-bottom: 1.5rem;
    }
    button {
        width: auto;
        text-align: left;
        padding: 0;
        color: ${({ theme }) => theme.color.darkGray};
    }

    @media only screen and (max-width: 784px) {
        margin: 3rem 0 6rem 0;
        position: relative;
        top: 0;

        * {
            margin-bottom: 2rem;
        }
    }
`;

const Main = styled.main`
    max-width: 750px;
    justify-self: start;

    h6 {
        margin-bottom: 0.7rem;
    }

    p {
        margin-bottom: 3rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
    ul {
        padding-left: 2rem;
        li {
            margin-bottom: 1rem;
            list-style: disc;
        }
    }
    section {
        margin-bottom: 4rem;
        padding-bottom: 4rem;
        border-bottom: solid 1px ${({ theme }) => theme.color.darkGray};

        &:last-child {
            margin-bottom: 12rem;
            padding-bottom: 0;
            border-bottom: none;
        }
    }
    .set {
        margin-bottom: 3rem;
        &:last-child {
            margin-bottom: 0;
        }
    }
`;
