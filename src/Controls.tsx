import React,{useState} from 'react';
import './App.css';
import './controls.css'

type ControlsProps = {
    enable: boolean;
    refresh: boolean;
    onEnabled: () => void;
    onRefresh: () => void;
};


function Controls({
    enable,
    refresh,
    onEnabled,
    onRefresh,
                  }: ControlsProps) {

    return (
        <div className="controls">
            <div>
                <input className={'Enable-input'} type={'checkbox'} checked={enable} onClick={()=>{onEnabled()}}/>
                <label className={'Enable-label'}>Enable</label>
            </div>
            <div>
                <input className={'refresh-input'} type={'checkbox'} checked={refresh} disabled={!enable} onClick={()=>{onRefresh()}} />
                <label className={'refresh-label'}>Auto-refresh every 5 second</label>
            </div>
        </div>
    );
}

export default Controls;
