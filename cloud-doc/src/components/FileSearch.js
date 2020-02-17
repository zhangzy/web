import React,{ useState,useEffect,useRef } from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import useKeyPress from "../hooks/useKeyPress";
import KeyCodeMap from "../utils/KeyCodeMap";
const FileSearch = ({title,onFileSearch}) => {
    const [inputActive,setInputActive] = useState(false);
    const [value,setValue] = useState('');

    let inputRef = useRef(null);

    const closeSearch = () => {
        setValue('');
        setInputActive(false);
    };

    const escKeyIsTrigger   = useKeyPress(KeyCodeMap.ESC);
    const enterKeyIsTrigger = useKeyPress(KeyCodeMap.ENTER);

    useEffect(() => {

        if(escKeyIsTrigger && inputActive){
            closeSearch();
        }

        if(enterKeyIsTrigger && inputActive){
            onFileSearch(value);
        }

    });

    useEffect(() => {
        inputActive && inputRef.current.focus();
    },[inputActive]);

    return (
        <div className="d-flex mb-0 alert alert-info justify-content-between align-content-center">
        {
            inputActive === false && <>
                <span>{title}</span>
                <button type="button" className="icon-btn" onClick={() => setInputActive(true)}>
                    <FontAwesomeIcon icon={faSearchengin} size="lg" />
                </button>
            </>
        }
        {
            inputActive === true && <>
                <input ref={inputRef} type="text" className="form-control" value={value} onChange={(e) => setValue(e.target.value)}/>
                <button className="icon-btn" onClick={closeSearch}>
                    <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                </button>
            </>
        }
        </div>
    );
};

FileSearch.propTypes = {
    title: PropTypes.string,
    onFileSearch: PropTypes.func.isRequired
};

FileSearch.defaultProps = {
    title: 'My Document'
};

export default FileSearch;