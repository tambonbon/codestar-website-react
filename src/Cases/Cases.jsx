import React from 'react';
import Container from '../Container/Container';
import CaseHeader from '../CaseHeader/CaseHeader';

import casesList from './CasesList';

const Cases = props => (
	<div>
		<section>
			<Container fullHeightMinusNavBar center>
				<div className="row">
					<div className="col">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat
						expedita error dolor omnis saepe repellat officiis deleniti,
						reprehenderit fugiat laboriosam explicabo provident assumenda magnam
						vitae aliquid dolorem harum, doloremque maiores.
					</div>
				</div>
				<div className="row mt-5">
					<div className="col">
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste
						itaque eos aspernatur tenetur velit aperiam minima asperiores
						consequatur deleniti totam soluta numquam voluptatem accusamus
						eligendi, aut beatae cum, odit excepturi.
					</div>
				</div>
			</Container>
		</section>

		{casesList.map(clientCase => (
			<CaseHeader {...clientCase} readMore={true} key={clientCase.c} />
		))}
	</div>
);

export default Cases;
