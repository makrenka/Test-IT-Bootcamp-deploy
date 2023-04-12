import { Component } from 'react';
import { HandySvg } from 'handy-svg';
import classNames from 'classnames';

import { RickService } from '../../services/RickService';

import closeBtn from '../../assets/img/close-button.svg';
import abyss from '../../assets/img/abyss.jpg';

import './CharInfo.scss';
import { Spinner } from '../Spinner';
import { ErrorMessage } from '../ErrorMessage';

export class CharInfo extends Component {

    state = {
        char: null,
        loading: false,
        error: false,
    };

    rickService = new RickService();

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
        });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    updateChar = () => {
        const { selectedId } = this.props;
        if (!selectedId) { return };

        this.setState({ loading: true });

        this.rickService
            .getCharacter(selectedId)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    componentDidMount() {
        this.updateChar();
    };

    componentDidUpdate(prevProps) {
        if (this.props.selectedId !== prevProps.selectedId) {
            this.updateChar();
        };
    }

    render() {
        const { onModal, closeModal } = this.props;
        const { loading, error, char } = this.state;

        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = loading || error || !char ? null : <View char={char} />;

        return (
            <>
                <div className={classNames("char-info", { active: onModal })}>
                    {spinner}
                    {errorMessage}
                    {content}
                    <button className='char-info__close-btn' onClick={closeModal}>
                        <HandySvg
                            src={closeBtn}
                            className='char-info__close-btn-icon'
                            width='30'
                            height='30'
                        />
                    </button >
                </div>
                <div className={classNames("overlay", { active: onModal })} onClick={closeModal}></div>
            </>

        );
    };
};

const View = ({ char }) => {
    const { image, name, status, species, gender, origin, location } = char;

    return (
        <div className="char-info__wrapper">
            <img src={image} alt="abyss" className='char-info__img' />
            <div className='char-info__description'>
                <table className='char-info__description-table'>
                    <tbody>
                        <tr>
                            <th>Name:</th>
                            <th>Origin:</th>
                        </tr>
                        <tr>
                            <td>{name}</td>
                            <td>{origin}</td>
                        </tr>
                        <tr>
                            <th>Status:</th>
                            <th>Location:</th>
                        </tr>
                        <tr>
                            <td>{status}</td>
                            <td>{location}</td>
                        </tr>
                        <tr>
                            <th>Species:</th>
                            <th>Gender:</th>
                        </tr>
                        <tr>
                            <td>{species}</td>
                            <td>{gender}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}