import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineBuildingOffice, HiOutlineTableCells } from 'react-icons/hi2';
import { LuFactory } from 'react-icons/lu';
import { GiMaterialsScience } from 'react-icons/gi';
import { BiCategoryAlt } from 'react-icons/bi';
import { IoMdResize } from 'react-icons/io';
import { FiType } from 'react-icons/fi';
import { MdGppGood, MdOutlineBorderColor } from 'react-icons/md';
import { RiBillLine } from 'react-icons/ri';

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-grey-600);
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}

	/* This works because react-router places the active class on the active NavLink */
	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-grey-800);
		background-color: var(--color-grey-50);
		border-radius: var(--border-radius-sm);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-brand-600);
	}
`;

function MainNav() {
	return (
		<nav>
			<NavList>
				{/* <li>
					<StyledNavLink to='/dashboard'>
						<HiOutlineHome />
						<span>Home</span>
					</StyledNavLink>
				</li> */}
				<li>
					<StyledNavLink to='/items'>
						<HiOutlineTableCells />
						<span>البضائع</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/categories'>
						<BiCategoryAlt />
						<span>الاصناف</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/sizes'>
						<IoMdResize />
						<span>المقاسات</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/types'>
						<FiType />
						<span>الانواع</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/inventories'>
						<HiOutlineBuildingOffice />
						<span>المخازن</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/manufactures'>
						<LuFactory />
						<span>المصانع</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/materials'>
						<GiMaterialsScience />
						<span>الخامات</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/standerds'>
						<MdGppGood />
						<span>المعايير</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/outOrders'>
						<RiBillLine />
						<span>طلبيات البيع</span>
					</StyledNavLink>
				</li>
				<li>
					<StyledNavLink to='/createOutOrder'>
						<MdOutlineBorderColor />
						<span>طلب بيع</span>
					</StyledNavLink>
				</li>
			</NavList>
		</nav>
	);
}

export default MainNav;
