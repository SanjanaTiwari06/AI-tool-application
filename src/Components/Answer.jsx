import React, { useState } from 'react'
import { checkHeading } from './Helper';
import { replaceHeading} from './Helper';


const Answer = ({ ans ,index , totalresult,type}) => {
    // console.log({ ans })
    const [Heading ,setHeading] = useState(false)
    const [Answer, setAnswer] = useState(ans)
    // console.log(index)

  React.useEffect(() => {
        if(checkHeading(ans)){
            setHeading(true)
            setAnswer( replaceHeading(ans))
        };
    }, [ans]);

    
    return (


        <div>

            {index==0 && totalresult>1?<span className='text-2xl pt-4  block'>{Answer}</span>:
            Heading?<span className='pt-4 text-lg block'>{Answer}</span>:<span className={type=='q'?'pl-1':'pl-5'}>{Answer}</span>}
        </div>
    )
}

export default Answer



// give me some alternates to say "hy"