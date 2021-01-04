import React from 'react';
import { TabButton, TabButtons, TabContent, Wrapper } from './Tabs.styles';

const Tabs = ({ tabs, activeIndex = 0, onIndexChange }) => {
    return (
        <Wrapper>
            <TabButtons>
                {tabs.map((item, index) => (
                <>
                    <TabButton data-testid='tabButton'
                    isActive={activeIndex === index}
                    onClick={() => onIndexChange(index)}
                    >
                    {item.header()}
                    </TabButton>
                </>
                ))}
            </TabButtons>
            <TabContent data-testid='tabContent' bgImage={tabs[activeIndex].bgImage()}>{tabs[activeIndex].content()}</TabContent>
        </Wrapper>
    );
};
export default Tabs;