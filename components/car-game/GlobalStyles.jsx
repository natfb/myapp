import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { theme, GlobalStyles } from 'twin.macro';

const CustomStyles = createGlobalStyle`
    body {
        -webkit-tap-highlight-color: ${theme`colors.purple.500`};
        ${tw`antialiased`}
        ${tw`bg-gray-900`} 
    }
`;

const GlobalStyle = () => (
    <>
        <BaseStyles />
        <CustomStyles />
    </>
)

export default GlobalStyle
