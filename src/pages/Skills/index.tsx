import daycare_img from '../../assets/images/daycare_img.png'
import daycare from '../../assets/images/daycare.png'
import bottle from '../../assets/images/bottle.png'
import training from '../../assets/images/training.png'

export default function Skills(): JSX.Element | null {
    return (
        <>
            <div className="w-full mb-44">
                <img alt="sword" src={daycare_img} className="mx-auto w-16 mt-24 md:w-32" />
                <img alt="sword" src={daycare} className="mx-auto w-52 mt-4 md:w-1/3" />
            </div>
            <div className="w-full bg-custom-blue text-center pb-24">
                <img alt="sword" src={bottle} className="mx-auto w-64 -m-32" />
                <img alt="sword" src={training} className="mx-auto w-64 mt-32 md:w-1/3 mb-8" />
                <span className="text-md md:text-2xl text-white mb-14">Automate Daily Check-in For Your Adventure</span>
            </div>
        </>
    )
}
