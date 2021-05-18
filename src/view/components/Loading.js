import React from 'react'
import {Typography,Modal,CircularProgress} from '@material-ui/core';
import { changeLoading } from '../../store/actions/loading.action';
import {useSelector,useDispatch} from 'react-redux';

export default function Loading() {

    const dispatch=useDispatch();
    const loading = useSelector(state => state.loadinReducers);
    return (
        <Modal
          open={loading.open}
          onClose={() => dispatch( changeLoading({open:false}) )}
          className="d-flex justify-content-center align-items-center h-100"
        >
           <div className="bg-white d-flex align-items-center rounded-lg p-3">

               <CircularProgress color="primary"  size={20} />
               <Typography style={{marginLeft:"0.5em"}} variant="subtitle1">{loading.msg}</Typography>

           </div>

        </Modal>
    )
}
