import styled from 'styled-components';

const Tag = styled.div`
	/* width: fit-content; */
	text-transform: uppercase;
	font-size: 1.2rem;
	font-weight: 600;
	padding: 0.4rem 1.2rem;
	border-radius: 100px;
	text-align: center;

	color: ${(props) => (props.type === 'red' ? 'var(--color-red-100)' : `var(--color-${props.type}-700)`)};
	background-color: ${(props) =>
		props.type === 'red' ? 'var(--color-red-700)' : `var(--color-${props.type}-100)`};
`;

export default Tag;
