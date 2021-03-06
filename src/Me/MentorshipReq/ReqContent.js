import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../components/Button';
import { STATUS } from '../../helpers/mentorship';
import { Tooltip } from 'react-tippy';
import { report } from '../../ga';

const Block = styled.div`
  & + div {
    margin-top: 24px;
  }
  h4 {
    font-weight: bold;
    color: #828282;
  }

  p {
    margin: 4px 0;
    color: #4f4f4f;
  }
`;

const RequestFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CallToAction = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  > button {
    width: 110px;
    height: 36px;
    border-radius: 3px;
    margin: 0;

    &:not(:first-child) {
      margin-left: 8px;
    }
  }
`;

const ReqContent = ({
  message,
  background,
  expectation,
  status,
  onAccept,
  onDecline,
  isLoading,
  isMine,
  menteeEmail,
}) => {
  const hideBtns =
    isMine || [STATUS.approved, STATUS.rejected].includes(status);
  return (
    <div data-testid="request-content">
      <Block>
        <h4>Message</h4>
        <p>{message}</p>
      </Block>
      {background && (
        <Block>
          <h4>Background</h4>
          <p>{background}</p>
        </Block>
      )}
      {expectation && (
        <Block>
          <h4>Expectations</h4>
          <p>{expectation}</p>
        </Block>
      )}
      {hideBtns ? null : (
        <RequestFooter>
          <CallToAction>
            <Button skin="secondary" onClick={onDecline}>
              Decline
            </Button>
            <Button skin="primary" onClick={onAccept} isLoading={isLoading}>
              Accept
            </Button>
          </CallToAction>
          <CallToAction>
            <Tooltip
              title="Don't forget to approve the request if it works for you"
              size="regular"
              arrow={true}
              position="top"
            >
              <a
                onClick={() => report('mentorship request', 'send message')}
                href={`mailto:${menteeEmail}`}
              >
                Send a message
              </a>
            </Tooltip>
          </CallToAction>
        </RequestFooter>
      )}
    </div>
  );
};

ReqContent.propTypes = {
  message: PropTypes.string.isRequired,
  background: PropTypes.string,
  expectation: PropTypes.string,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default ReqContent;
