import React from 'react';
import classNames from 'classnames';
import { SectionSplitProps } from '../../utils/SectionProps';
import SectionHeader from './partials/SectionHeader';
import Image from '../elements/Image';
import {browser} from "../../views/Room/RoomFooter";
import {isSafari} from "../../views/Home";

const propTypes = {
  ...SectionSplitProps.types
}

const defaultProps = {
  ...SectionSplitProps.defaults
}

const FeaturesSplit = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  invertMobile,
  invertDesktop,
  alignTop,
  imageFill,
  ...props
}) => {

  const outerClasses = classNames(
    'features-split section',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'features-split-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const splitClasses = classNames(
    'split-wrap',
    invertMobile && 'invert-mobile',
    invertDesktop && 'invert-desktop',
    alignTop && 'align-top'
  );

  const sectionHeader = {
    title: 'Workflow that just works',
    paragraph: "Simple design. There’s no need to install any app or software. Just choose your own personalized URL and meet using your internet browser with just one click."
  }
  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container">
        <div className={innerClasses}>
          <SectionHeader data={sectionHeader} className="center-content home-page" />
          <div className={splitClasses}>
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Custom rooms
                  </div>
                <h3 className="mt-0 mb-12">
                  Simple room links
                  </h3>
                <p className="m-0">
                  Share the same custom link for every meeting – Easy to remember and easy to join.
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <Image
                  src={'/images/simple_url.jpg'}
                  alt="Simple room url"
                  width={528}
                  height={396} />
              </div>
            </div>

            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Beautiful UI
                  </div>
                <h3 className="mt-0 mb-12">
                  Functional UI.
                  </h3>
                <p className="m-0">
                Host presentations and collaborate with team members using the screen sharing feature and share your thoughts using built in chat.
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <picture>
                  {
                    isSafari() ?
                        <img alt="roomview" src="/images/ui.png" />
                        : <source srcSet="/images/ui.webp" />
                  }
                </picture>
              </div>
            </div>

            <div className="split-item mobile-view">
              <div className="split-item-content center-content-mobile reveal-from-left" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Mobile Friendly
                  </div>
                <h3 className="mt-0 mb-12">
                  Meetings on the go
                  </h3>
                <p className="m-0">
                  Join from any mobile device on Android or iOS without installing anything.
                  </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill', 'mobile-view-container'
                )}
                data-reveal-container=".split-item">
                <picture className={classNames('mobile-view-image')}>
                  {
                    isSafari() ?
                        <img className={classNames('mobile-view-image')} alt="roomview" src="/images/mobileview.png" />
                        : <source srcSet="/images/mobileview.webp"/>
                  }
                </picture>
              </div>
            </div>
            <div className="split-item">
              <div className="split-item-content center-content-mobile reveal-from-right" data-reveal-container=".split-item">
                <div className="text-xxs text-color-primary fw-600 tt-u mb-8">
                  Multiple Rooms
                </div>
                <h3 className="mt-0 mb-12">
                  Multiple private rooms.
                </h3>
                <p className="m-0">
                  Create multiple private rooms to host different meetings.
                </p>
              </div>
              <div className={
                classNames(
                  'split-item-image center-content-mobile reveal-from-bottom',
                  imageFill && 'split-item-image-fill'
                )}
                data-reveal-container=".split-item">
                <picture>
                  {
                      isSafari() ? <img alt="roomview" src="/images/userpage.png" />
                        : <source srcSet="/images/userpage.webp"/>
                  }
                </picture>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

FeaturesSplit.propTypes = propTypes;
FeaturesSplit.defaultProps = defaultProps;

export default FeaturesSplit;