import React from 'react'
import Drawer from '@material-ui/core/Drawer'



import flame_icon from './assets/flame_icon.png'
import yasss_icon from './assets/yasss_icon.png'
import basic_icon from './assets/basic_icon.png'
import ytho_icon from './assets/ytho_icon.png'
import want_icon from './assets/want_icon.png'
import ugh_icon from './assets/ugh_icon.png'
import soundon_icon from './assets/soundon_icon.png'
import itme_icon from './assets/itme_icon.png'
import stresslevel_icon from './assets/stresslevel_icon.png'
import mood_icon from './assets/mood_icon.png'
import truu_icon from './assets/truu_icon.png'
import meh_icon from './assets/meh_icon.png'
import bye_icon from './assets/bye_icon.png'
import nope_icon from './assets/nope_icon.png'
import hitmeup_icon from './assets/hitmeup_icon.png'
import k_icon from './assets/k_icon.png'
import tired_icon from './assets/tired_icon.png'
import bruh_icon from './assets/bruh_icon.png'
import queen_icon from './assets/queen_icon.png'
import before_icon from './assets/before_icon.png'
import after_icon from './assets/after_icon.png'
import blueheart_icon from './assets/blueheart_icon.png'
import king_icon from './assets/king_icon.png'
import pinkheart_icon from './assets/pinkheart_icon.png'
import loveone_icon from './assets/loveone_icon.png'
import birthday_icon from './assets/birthday_icon.png'



const AddIconDrawer = ({ openDrawer, handleCloseDrawer, handleSetIconUrl }) => {

    const icons = [
        flame_icon, yasss_icon, basic_icon, ytho_icon, want_icon, ugh_icon, soundon_icon, itme_icon, stresslevel_icon,
        mood_icon, truu_icon, meh_icon, bye_icon, nope_icon, hitmeup_icon, k_icon, tired_icon, bruh_icon, 
        king_icon, queen_icon, before_icon, after_icon, blueheart_icon, pinkheart_icon, loveone_icon, birthday_icon,
    ]

    return (
        <Drawer
            anchor='bottom'
            open={openDrawer}
            onClose={handleCloseDrawer}
        >
            <div className="add-icon-drawwer-container">
                <span className='top-span'></span>

                <div className='icon-listing-container'>
                    {
                        icons.map((icon, i) => {
                            return (
                                <div className='each-icon-container' key={i}>
                                    <button onClick={() => handleSetIconUrl(icon)}>
                                        <img src={icon} alt='ICON' />
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

        </Drawer>
    )
}


export default AddIconDrawer