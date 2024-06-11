import React, { type SetStateAction, type Dispatch } from 'react';
import { InputField } from '../../styles/authentication';

interface Props {
    width?: string;
    name: string;
    img?: string;
    labelText: string;
    activeValue: string | boolean;
    id: string;
    setActiveValue: Dispatch<SetStateAction<string | boolean>>;
}

const CustomRadio = ({id, width, name, img, labelText, activeValue, setActiveValue} : Props) => {
    return(
        <>
            <InputField width={width}>
                <label htmlFor={id}>
                    <section
                        style={(typeof activeValue === 'boolean' && activeValue) ||  (labelText && (labelText.replaceAll(' ', '_').toLocaleLowerCase() === activeValue)) ? {
                            border: '2px solid var(--primary-color)'
                        } : {
                            border: '1px solid #E5DFD9'
                        }}
                        className='py-3 px-5 rounded-[8px]'
                    >
                        <div className='flex items-center justify-between'>
                            <div className='w-[90%] flex items-center gap-[6px]'>
                                {
                                    img &&
                                    <img 
                                        src={img}
                                        alt={labelText}
                                        className="h-[25px]"
                                    />
                                }
                                <p className='w-[90%] text-[14px]'>{labelText}</p>
                            </div>
                            <input 
                                name={name} 
                                type='radio'
                                id={id}
                                onChange={() => setActiveValue(labelText && labelText.replaceAll(' ', '_').toLocaleLowerCase())}
                                checked={typeof activeValue === 'boolean' ? activeValue : (labelText && (labelText.replaceAll(' ', '_').toLocaleLowerCase() === activeValue) ? true : false)}
                            />
                        </div>
                    </section>
                </label>
            </InputField>
        </>
    )
}

export default CustomRadio;