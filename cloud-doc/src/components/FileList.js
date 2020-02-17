import React, {useState, useRef, useEffect} from "react";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMarkdown } from '@fortawesome/free-brands-svg-icons';
import {faEdit, faTimesCircle, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import useKeyPress from "../hooks/useKeyPress";
import KeyCodeMap from "../utils/KeyCodeMap";

const FileList = ({ files,onFileClick,onSaveEdit,onFileDelete }) => {
    const [editStatus,setEditStatus] = useState(0);
    const [value,setValue] = useState('');

    const inputEditRef = useRef(null);

    const enterIsTrigger = useKeyPress(KeyCodeMap.ENTER);
    const escIsTrigger   = useKeyPress(KeyCodeMap.ESC);

    const closeEdit = () => {
        setEditStatus(0);
        setValue('');
    };

    useEffect(() => {

        if(editStatus > 0){
            console.log(editStatus,enterIsTrigger,escIsTrigger);
            if(enterIsTrigger){
                onSaveEdit && onSaveEdit(editStatus,value);
                closeEdit();
            }

            if(escIsTrigger){
                closeEdit();
            }
        }

    });

    useEffect(() => {
        editStatus > 0 && inputEditRef.current.focus();
    },[editStatus]);

    return (
        <ul className="list-group list-group-flush file-list">
            {
                files && files.map((file) =>
                (
                    editStatus !== file.id ?
                    <li key={file.id} className="list-group-item pl-0 bg-light d-flex align-items-center">
                        <span className="col-2">
                            <FontAwesomeIcon icon={faMarkdown} size="lg" />
                        </span>
                        <span onClick={() => onFileClick && onFileClick(file.id)} className="col-7 font-weight-bold">{file.title}</span>
                        <button type="button" onClick={() => {setEditStatus(file.id);setValue(file.title)}} className="icon-btn col-1">
                            <FontAwesomeIcon title="edit" icon={faEdit} size="lg" />
                        </button>
                        <button onClick={() => onFileDelete && onFileDelete(file.id)} type="button" className="icon-btn col-1 ml-2">
                            <FontAwesomeIcon title="del" icon={faTrashAlt} size="lg" />
                        </button>
                    </li>
                    :
                    <li key={file.id} className="list-group-item pl-0 bg-light d-flex align-items-center">
                        <span className="col-2">
                            <FontAwesomeIcon icon={faMarkdown} size="lg" />
                        </span>
                        <input ref={inputEditRef} type="text" className="form-control ml-3 col-7" value={value}
                               onChange={(e) => setValue(e.target.value)}/>
                        <button type="button" onClick={closeEdit} className="icon-btn col-2">
                            <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                        </button>
                    </li>
                ))
            }
        </ul>
    );
};

FileList.protoTypes = {
    files: PropTypes.array.isRequired,
    onFileClick: PropTypes.func,
    onSaveEdit: PropTypes.func,
    onFileDelete: PropTypes.func,
};

export default FileList;

