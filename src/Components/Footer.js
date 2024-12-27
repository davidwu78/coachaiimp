import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Link from 'Themes/components/Link';
import Icon from 'Themes/components/Icon';
import i18n from 'Language/i18n';
import { withTranslation } from 'react-i18next';

const Main = styled.div`
  display: flex;
  align-items: flex-end;
  background-color: #2b2b2b;
  width: 100%;
  height: 200px;
  padding: .5rem 10%;
  z-index: 10;
  color: ${(props) => props.theme.textWhite};
`;

const Logo = styled.span`
  font-size: 30px;
  font-weight: 500;
  color: ${(props) => props.theme.textWhite};
`;

const BrandLink = styled(Link)`
  display: block;
  padding: 10px 0;
`;

const StyledLink = styled(Link)`
  font-size: 14px;
  /* font-weight: 500; */
  padding: 0 7px;
  :hover{
    color: ${(props) => props.theme.primary};
    transition: all 0.5s;
  }
`;

const LinksWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  padding: 10px 0;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  padding: 5px 0;
`;

const InfoWrapper = styled.div`
  display: block;
  padding: 10px 0;
  margin-left: 40px;
`;

const RightWrapper = styled.div`
  display: block;
  padding: 10px 0;
  margin-left: auto;
  text-align: right;
`;

const CopyRight = styled.div`
  font-size: 13px;
  padding: 0 7px;
`;

const Seperator = styled.span`
  font-size: 8px;
  transform: translateY(3px); 
`;

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  bottom: -200px;
`;

const Lng = styled.div`
  font-size: 15px;
  padding: 0 7px;
  cursor: pointer;
  border-radius: 3px;

  ${(props) => props.status && `
    color: #ebff78;
  `}

  ${(props) => !props.status && `
    :hover{
      color: #ebff78;
      transition: all 0.5s;
    }
  `}
`;

class Footer extends PureComponent {
  render() {
    const { t } = this.props;
    return (
      <Wrapper>
        <Main>
          <InfoWrapper>
            <BrandLink to="/">
              <Logo>CoachAI</Logo>
            </BrandLink>
            <Info>
              <Icon size={20} type="building" />
              &nbsp;&nbsp;
              {t('footer.address')}
            </Info>
            <Info>
              <Icon size={20} type="envelope" />
              &nbsp;&nbsp;
              Email : Service@xxx.com
            </Info>
            <Info>
              <Icon size={20} type="telephone" />
              &nbsp;&nbsp;
              {t('footer.phone')}
            </Info>
          </InfoWrapper>
          <RightWrapper>
            <LinksWrapper>
              <Lng onClick={() => { i18n.changeLanguage('zh'); }} status={i18n.language === 'zh'} style={{ fontWeight: 600 }}>中文</Lng>
              <Lng onClick={() => { i18n.changeLanguage('en'); }} status={i18n.language === 'en'}>EN</Lng>
            </LinksWrapper>
            {
              i18n.language === 'en' ? (
                <>
                  <LinksWrapper style={{ paddingBottom: 0 }}>
                    <StyledLink to="/">{t('footer.players')}</StyledLink>
                    <Seperator>|</Seperator>
                    <StyledLink to="/">{t('footer.service')}</StyledLink>
                    <Seperator>|</Seperator>
                    <StyledLink to="/">{t('footer.center')}</StyledLink>
                  </LinksWrapper>
                  <LinksWrapper style={{ paddingTop: 0 }}>
                    <StyledLink to="/policies/member">{t('footer.member')}</StyledLink>
                    <Seperator>|</Seperator>
                    <StyledLink to="/policies/private">{t('footer.private')}</StyledLink>
                  </LinksWrapper>
                </>
              ) : (
                <LinksWrapper>
                  <StyledLink to="/">{t('footer.players')}</StyledLink>
                  <Seperator>|</Seperator>
                  <StyledLink to="/">{t('footer.service')}</StyledLink>
                  <Seperator>|</Seperator>
                  <StyledLink to="/">{t('footer.center')}</StyledLink>
                  <Seperator>|</Seperator>
                  <StyledLink to="/policies/member">{t('footer.member')}</StyledLink>
                  <Seperator>|</Seperator>
                  <StyledLink to="/policies/private">{t('footer.private')}</StyledLink>
                </LinksWrapper>
              )
            }
            <CopyRight>
              Copyright &copy; CoachAI 2020 All Rights Reserved
            </CopyRight>
          </RightWrapper>
        </Main>
      </Wrapper>
    );
  }
}

export default withTranslation()(Footer);
