import React from 'react'
import Drawer from '@material-ui/core/Drawer'





const AddIconDrawer = ({ openDrawer, handleCloseDrawer, handleSetIconUrl }) => {

    const icons = [
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18279665_458703284471919_1669812937415458816_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=ExpoxmFl0EIAX8FnYws&oh=12caa73d48078052061c07707ed1c6aa&oe=5FC6EC88',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18280522_1528716123840380_8382539550513168384_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=5FllOhBOX8MAX_OkHkM&oh=7c3ea4afb94841b0df2ac24122b7143e&oe=5FC8BC44',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18158968_762691923911067_8446954099924008960_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=kGW5Ux97KtMAX_emd6A&oh=f2ceb1d25e87162c8ef41b9d75cf2681&oe=5FC7F485',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18279654_133313763881502_5476115248366747648_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=m_dRRQ23mK0AX9aSPXa&oh=9d150cb5b112504c925ad8717b2c89d3&oe=5FC9E008',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18405845_288519644908812_7531323194754465792_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=aZpRpo8JaEwAX-O56-A&oh=2d8047f4b0cbf9b56f81da8bdc9c8576&oe=5FC9C113',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18235399_1040522726080799_2548944686517583872_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=nxNvHMuh98gAX8FnfKl&oh=b71f89e2c8d3705a2e0198a37e8f7bad&oe=5FC88B6D',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18235425_1772051209792290_4057072845635715072_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=EP_ON-P0vzsAX_NimNf&oh=9d6880c98d8e250f32917dc0856c82a8&oe=5FC65F2F',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18316423_1865360523680690_4821734568019099648_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=GQlyQ12_I0kAX9UIGa9&oh=59009c745c964dfcbdf7bd2ff037e760&oe=5FC9B468',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18158874_1978473202375775_260519023819620352_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=6Ug0t_5-PjYAX_83prD&oh=a580d26e96c769c179f2ddcd0166e5b9&oe=5FC92B74',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18159111_458972894437254_4636509151281807360_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=OdEel_CqP_UAX9trtpY&oh=1f8a657e7c36dd9f030ca4881704b81e&oe=5FC9F544',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18316450_1837968613134848_3919074047471648768_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=qVwQmCK8PiMAX8ktznQ&oh=e7641002c9c8694a78561c0ab2224845&oe=5FC8499C',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18235405_290639638030064_2125548627249070080_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=GjrS45m3soEAX_zTw4q&oh=07fa1a8f7e022a5eeb904d68535e61ee&oe=5FC9C31C',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18406618_164829170715735_8253934717703815168_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=yHANy7jQd5MAX9xlwoz&oh=2d7a4c807db7eaca122686f7eca40e8d&oe=5FC98FCF',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18279661_1836860423302762_8868910108197781504_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=_FIsvgvakYgAX8SMk9f&oh=72369b0061a41f4e88fb97d40a51db84&oe=5FC70DF4',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18235698_421619758211305_4711595483242430464_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=skf_qYMvwMkAX_ceaPB&oh=4d04dd4dcf315b63c5ab81b8c35cf9f0&oe=5FCA0F50',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18235396_1491939724192354_1977516742531874816_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=YP0N-mN19ukAX9JOOJu&oh=8abfaa4c4b4c76d65f939f83c27cf508&oe=5FC705EA',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18235339_1883631565244590_8545090804102725632_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=j-jn1xpAQW8AX-dBHzY&oh=3114e903e99966f752a6698ae0bc0251&oe=5FCA15EF',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18309196_2028567710704180_4633971027473334272_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=vUoaXIP-KLYAX_ty9tK&oh=49f0de3c99c90ad334d49e210e1b13e9&oe=5FC8BF3D',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18235406_1899863660261336_2560473383762395136_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=qcg3X9V4xgoAX9Qkdmc&oh=9083f94357c8a8d79ec85671a8572c47&oe=5FC6A708',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18158995_821866781303539_7415601361162600448_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=zk8AxjxSMboAX8AmYcz&oh=901ca926ae8890a2d0a2352a70ba7349&oe=5FC93386',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18279630_1343793412380418_3274096789996699648_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=uFwlHe3PMD4AX9Y5HiM&oh=c797e337f0c89e68c2f876901d5b4555&oe=5FCA05A9',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/18235576_1508161545901706_5550403575403773952_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=0EEszwmK--sAX_IQJUT&oh=2b191a74c70df0a0b5bf3b13f2d69049&oe=5FC9D4AD',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/16180622_674792189312558_6858200651516608512_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=1Sx279mhSx8AX-ImJuF&oh=3bde6e7c23adf868c35142e020a18bfe&oe=5FC7405D',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/16180050_137380750105886_8810585904017047552_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=Az64J5oe_jEAX_4zdLE&oh=365cc27aa7b7c26350ec951615c68966&oe=5FC9298C',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/16344815_746280818881256_1538383708342452224_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=20FSHtk_FEAAX8WVI6A&oh=f778bafe10094e3421b15789eb74e41c&oe=5FC99D38',
        'https://instagram.flos5-1.fna.fbcdn.net/v/t39.10293-33/20189698_499573240376658_7481473712668016640_n.png?_nc_ht=instagram.flos5-1.fna.fbcdn.net&_nc_ohc=s_A5bcnKk4YAX-Jf_xo&oh=677d0dad892d8f393a71ab631f68f818&oe=5FC8B8BD',
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