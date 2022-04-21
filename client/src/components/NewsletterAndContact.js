import styled from "styled-components";

const NewsletterAndContact = () => {
    return (
        <Container className={`component component-newsletterAndContact`}>
            <Content>
                {/* <Item className="newsletter">
                    <p className="title">Newsletter</p>
                    <div className="group signup">
                        <input type="text" placeholder="E-mail address" />
                        <button>Send →</button>
                    </div>
                </Item> */}
                <Item className="contact">
                    <p className="title">Contact</p>
                    <a target="_blank" rel="noreferrer" href="mailto:info@hedvigcollection.com">
                        Info@hedvigcollection.com
                    </a>
                </Item>
            </Content>
        </Container>
    );
};

export default NewsletterAndContact;

const Container = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ theme }) => theme.color.lightBlue};
`;

const Content = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    width: 100%;
    max-width: var(--maxWidth);
    padding: 6rem var(--gutter);

    p,
    a,
    button {
        color: ${({ theme }) => theme.color.darkGray};
    }

    @media only screen and (max-width: 784px) {
        padding: 3rem var(--gutter);
        grid-template-columns: 1fr;
    }
`;

const Item = styled.section`
    display: flex;
    flex-direction: column;
    height: 100%;

    .group {
        display: flex;
    }

    .title {
        margin-bottom: 1.5rem;
    }

    &.newsletter {
        width: 60%;
        .signup {
            border-bottom: solid 1px ${({ theme }) => theme.color.darkGray};
        }

        input {
            flex: auto;
            margin-bottom: 1rem;
            &::placeholder {
                color: ${({ theme }) => theme.color.randomGray};
            }
        }
        button {
            text-align: right;
            text-transform: uppercase;
        }
    }
`;
