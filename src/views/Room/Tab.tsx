import React from "react";
export default function Tab(props) {
    // return (
    //     <TabContainer>
    //         <Tab active={true}>Content 1</Tab>
    //         <Tab>Content 2</Tab>
    //     </TabContainer>
    // );
    return (
        <div className={"tab-content"}>
            {props.children}
        </div>
    );
}