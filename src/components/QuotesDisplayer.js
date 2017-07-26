import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {autorun, observable, action} from 'mobx';
import {fetchQuote} from '../network/quotes';
import quotesBackup from '../quotesBackup';

class QuotesStore {
	@observable quote = {};

	@action fetchQuote() {
		fetchQuote().then((res) => {
			this.displayQuote(res);
		}).catch(err => {
			const quote = quotesBackup[Math.floor(Math.random()*quotesBackup.length)];
			this.displayQuote(quote);
		});
	}

	@action displayQuote(quote) {
		this.quote = quote;
	}
}

@inject('timerStore')
@observer
export default class QuotesDisplayer extends Component {
	constructor(props) {
		super(props);
		this.quotesStore = new QuotesStore();
		this.quotesStore.fetchQuote();
	}

	componentDidMount() {
		this.disposer = autorun(() => {
			if(this.props.timerStore.isBreak) this.quotesStore.fetchQuote();
		});
	}

	componentWillUnmount() {
		this.disposer();
	}

	render() {
		const {timerStore, ...props} = this.props;
		const {quoteText, quoteAuthor} = this.quotesStore.quote;

		return <div{...props}>{quoteText}<br/>— {quoteAuthor? quoteAuthor : 'unknown'}</div>
	}
}