import styled from 'styled-components/native';

interface ContainerProps {
    active?: boolean;
}

export const Container = styled.View<ContainerProps>`
    height: 6px;
    width: 6px;
    border-radius: 3px;
    margin-left: 8px;
    background-color: ${({ theme, active }) => (active ? theme.colors.main : theme.colors.text)};
`;
