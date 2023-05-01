import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/marvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import Error from '../error/error';
import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId]) 


    const onCharLoaded = (char) =>{
        setChar(char)
    }


    const updateChar = () =>{
        clearError();
        if(!props.charId){
            return;
        }
        getCharacter(props.charId)
            .then(onCharLoaded)
    }


    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMassage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading || !char) ? <View char={char}/> : null;
    
    return (
        <div className="char__info">
            {skeleton}
            {errorMassage}
            {spinner}
            {content}
        </div>
    )

}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    
    if (comics.length > 10){
        comics.length = 10
    }

    let comicsToShow = comics.length === 0 ? <li> No comics with this character</li> : comics.map((item, i) => {
        return(
            <li className="char__comics-item" key={i}>
                <Link to={`/comics/${item.resourceURI.match(/\d+$/g)}`}>{item.name}</Link>
            </li>
        )
   });

   const imgStyle = thumbnail ==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} :{objectFit: 'cover'};

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="characterImage" style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
               {comicsToShow}
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;