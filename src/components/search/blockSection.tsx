import React, { useState, useEffect } from 'react';
import { BoxFlex, BreadcrumbArea, DescHeader, MainWrap, PageToggleText, PageToggleHeader, Line } from '../../styles/reusable/index';
import Typography from '../reusable/typography';
import AuthHeaderComp from '../auth/authHeader';
import { Button } from '../../styles/reusable';
import * as Icon from 'react-feather';
import { BlockGrid, BlockRep, MainUnitGridWrap, PlanImagesWrap, PlanWrap, SelectBlockWrap, SelectUnitFlex } from './style';
import { useNavigate } from 'react-router-dom';
import { AuthBacknav } from '../../styles/authentication';
import { useProperties } from '../../store/properties/useProperties';
import { enqueueSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setActiveBlock } from '../../store/properties/reducer';

interface UnitModelProp {
    floor: string;
    units: Array<{
        name: string;
        sold: boolean
    }>
}

const BlockSection = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { activeProperty } = useProperties();
    const [activePage, setActivePage] = useState('Site Layout');
    const [unitSize, setUnitSize] = useState<number>(0)
    const [blocks, setBlocks] = useState<any>([])
    const [phase, setPhase] = useState('block');
    const [derivedUnitModel, setDerivedUnitModel] = useState<Array<UnitModelProp>>([])
    
    // Selection States and Functions
    const [selectedBlock, setSelectedBlock] = useState<number>();
    const [activeBlockState, setActiveBlockState] = useState({})
    const [selectedUnit, setSelectedUnit] = useState<number>()
    
    const toNext = () => {
        switch (phase) {
            case 'block':
                if (typeof selectedBlock === 'number' && selectedBlock > -1){
                    setActiveBlockState(blocks[selectedBlock]);
                    dispatch(setActiveBlock(blocks[selectedBlock]));
                    setPhase('units')
                }else {
                    enqueueSnackbar({
                        variant: "error",
                        message: 'Please select a block!'
                    })
                }
                break;
            case 'units':
                navigate('/select-plan');
                break;
            default:
                break;
        }
    }

    const getUnitModel = (index: number) => {
        const mockData: Array<UnitModelProp> = [];
        if (blocks && blocks.length > 0 && Object.keys(blocks[index])){
            for (let i = 0; i < blocks[index]?.floor_count; i++){
                mockData.push({
                    floor: i > 0 ? `${i}` : "Gnd",
                    units: blocks[index]?.apartments.length > 0 ? blocks[index]?.apartments.map((p:any, index:number) => {
                        if (p.floor === i){
                            return {
                                name: `U${index + 1}`,
                                sold: false
                            }
                        }else {
                            return 
                        }
                    }) : []
                })
            }
        }
        setDerivedUnitModel(mockData.reverse())
    }

    const getUnitSize = () => {
        const $EACH_UNIT_LENGTH: Array<number> = unitJSON.map((p) => Math.max(p.units.length));
        const $MAX_LENGTH:number = Math.max.apply(Math, $EACH_UNIT_LENGTH);
        if ($MAX_LENGTH){
            setUnitSize(100 / $MAX_LENGTH);
        }
    }

    useEffect(() => {
        getUnitSize();
    }, [unitJSON]) //eslint-disable-line

    useEffect(() => {
        if (activeProperty && activeProperty?.buildings){
            setBlocks(activeProperty?.buildings);
        }
    }, [activeProperty])

    return(
        <>
            <AuthHeaderComp />
            <MainWrap
                top='2rem'
                width='100%'
                maxWidth='1300px'
            >
                <AuthBacknav
                    onClick={() => navigate(-1)}
                >
                    <Icon.ArrowLeft 
                        color='#8796AD' 
                        size={20}
                    />
                    <p>Back</p>
                </AuthBacknav>
            </MainWrap>
            <MainWrap
                top='-0.5rem'
            >
                <PlanWrap>
                    <SelectUnitFlex>
                        <PlanImagesWrap>
                            <PageToggleHeader
                                hAlign='flex-start'
                                className='w-[auto]'
                            >
                                {
                                    pageItems.map((item, index) => (
                                        <PageToggleText 
                                            key={index}
                                            active={item === activePage}
                                            onClick={() => setActivePage(item)}
                                        >
                                            {item}
                                        </PageToggleText>
                                    ))
                                }
                            </PageToggleHeader>
                            <img 
                                src='./images/plan2.png'
                                alt='Plan'
                                className='w-[100%] mt-10 mb-5'
                            />
                        </PlanImagesWrap>
                        <SelectBlockWrap>
                            <Typography 
                                text={activeProperty?.title}
                                color='#091525'
                                fontWeight={600}
                                fontSize='24px'
                                lineHeight='28.8px'
                                margin='1rem 0 0.3rem 0'
                            />
                            <Typography 
                                text={`${activeProperty?.type && activeProperty?.type.toUpperCase()}・${activeProperty?.units} units`}
                                color='#245372'
                                fontWeight={400}
                                fontSize='15px'
                                lineHeight='24px'
                                margin='0rem 0 0 0'
                            />
                            <Typography 
                                text={`Select a ${phase === 'block' ? "Block" : "Unit"}`}
                                color='#245372'
                                fontWeight={400}
                                fontSize='15px'
                                lineHeight='24px'
                                margin='0.5rem 0 1.5rem 0'
                            />
                            {
                                phase === 'block' &&
                                    <BlockGrid>
                                        {
                                            (blocks && blocks.length > 0) && 
                                                <>
                                                    {
                                                        blocks.map((item:any, index:number) => (
                                                            <BlockRep 
                                                                key={index}
                                                                onClick={() => {
                                                                    setSelectedBlock(index);
                                                                    getUnitModel(index)
                                                                }}
                                                                border={selectedBlock === index ? '2px solid var(--primary-color)' : ''}
                                                            >
                                                                Block {index + 1}
                                                            </BlockRep>
                                                        ))
                                                    }
                                                </>
                                        }
                                    </BlockGrid>
                            }
                            {
                                phase === 'units' &&
                                    <>
                                        <BoxFlex
                                            vAlign='center'
                                            hAlign='space-between'
                                        >
                                            <Icon.ArrowLeft 
                                                strokeWidth={1}
                                                onClick={() => setPhase('block')}
                                                className='cursor-pointer'
                                            />
                                            <Typography 
                                                text={`Block A`}
                                                color='#245372'
                                                fontWeight={400}
                                                fontSize='15px'
                                                lineHeight='24px'
                                            />
                                            <div></div>
                                        </BoxFlex>
                                        {
                                            (derivedUnitModel && derivedUnitModel.length > 0) && 
                                                <>
                                                    <MainUnitGridWrap>
                                                        <div>
                                                            {
                                                                derivedUnitModel.map((item, index) => (
                                                                    <BoxFlex
                                                                        gap="30px"
                                                                        key={index}
                                                                        margin='1rem 0'
                                                                        hAlign="flex-start"
                                                                        className='flex'
                                                                    >
                                                                        <BlockRep
                                                                            bg='#F0F3F6'
                                                                            width='3rem'
                                                                        >
                                                                            {item.floor}
                                                                        </BlockRep>
                                                                        <BoxFlex
                                                                            gap="8px"
                                                                            key={index}
                                                                            hAlign='center'
                                                                            style={{
                                                                                width: '82%',
                                                                            }}
                                                                        >
                                                                            {
                                                                                (item.units && item.units.length > 0) && (
                                                                                    item.units.map((item, index) => (
                                                                                            <BlockRep
                                                                                                bg={item?.sold ? '#EBF4FE' : ''}
                                                                                                key={index}
                                                                                                style={{
                                                                                                    width: `${unitSize - 2}%`
                                                                                                }}
                                                                                            >
                                                                                                {item?.sold ? "Sold" : item?.name}
                                                                                            </BlockRep>
                                                                                    ))
                                                                                    
                                                                                )
                                                                                
                                                                            }
                                                                        </BoxFlex>
                                                                    </BoxFlex>
                                                                ))
                                                            }
                                                        </div>
                                                    </MainUnitGridWrap>
                                                </>
                                        }
                                    </>
                            }
                            <Line />
                            <BoxFlex
                                hAlign='space-between'
                            >
                                <Typography 
                                    text={phase === 'units' ? `0/0 Sold`: `0/${activeProperty?.buildings_count} Sold`}
                                    color='#091525'
                                    fontWeight={600}
                                    fontSize='18px'
                                    lineHeight='24px'
                                    margin='1rem 0 0 0'
                                />
                                <Button
                                    bg='var(--primary-color)'
                                    color='#fff'
                                    type='submit'
                                    width='7rem'
                                    onClick={() => toNext()}
                                >
                                    Next
                                </Button>
                            </BoxFlex>
                        </SelectBlockWrap>
                    </SelectUnitFlex>
                </PlanWrap>
            </MainWrap>
        </>
    )
}

export default BlockSection;

const unitJSON = [
    {
        floor: '3rd',
        units: [
            {
                name: 'U1',
                sold: false
            },
            {
                name: 'U2',
                sold: false
            },
            {
                name: 'U3',
                sold: true
            },
            {
                name: 'U4',
                sold: false
            },
            {
                name: 'U25',
                sold: false
            },
        ]
    },
    {
        floor: '2nd',
        units: [
            {
                name: 'U5',
                sold: false
            },
            {
                name: 'U6',
                sold: false
            },
            {
                name: 'U7',
                sold: false
            },

            {
                name: 'U8',
                sold: false
            },
        ]
    },
    {
        floor: '2nd',
        units: [
            {
                name: 'U5',
                sold: false
            },
            {
                name: 'U6',
                sold: false
            },
            {
                name: 'U7',
                sold: false
            },

            {
                name: 'U8',
                sold: false
            },
        ]
    },
    {
        floor: '2nd',
        units: [
            {
                name: 'U5',
                sold: false
            },
            {
                name: 'U6',
                sold: false
            },
            {
                name: 'U7',
                sold: false
            },

            {
                name: 'U8',
                sold: false
            },
        ]
    },
    {
        floor: '2nd',
        units: [
            {
                name: 'U5',
                sold: false
            },
            {
                name: 'U6',
                sold: false
            },
            {
                name: 'U7',
                sold: false
            },

            {
                name: 'U8',
                sold: false
            },
        ]
    },
    {
        floor: '2nd',
        units: [
            {
                name: 'U5',
                sold: false
            },
            {
                name: 'U6',
                sold: false
            },
            {
                name: 'U7',
                sold: false
            },

            {
                name: 'U8',
                sold: false
            },
            {
                name: 'U5',
                sold: false
            },
            {
                name: 'U5',
                sold: false
            },
        ]
    },
    {
        floor: '2nd',
        units: [
            {
                name: 'U5',
                sold: false
            },
            {
                name: 'U6',
                sold: false
            },
            {
                name: 'U7',
                sold: false
            },

            {
                name: 'U8',
                sold: false
            },
        ]
    },
    {
        floor: '1st',
        units: [
            {
                name: 'U9',
                sold: false
            },
            {
                name: 'U10',
                sold: false
            },
            {
                name: 'U11',
                sold: false
            },

            {
                name: 'U12',
                sold: false
            },
        ]
    },
    {
        floor: 'Gnd',
        units: [
            {
                name: 'U3',
                sold: false
            },
            {
                name: 'U14',
                sold: false
            },
            {
                name: 'U15',
                sold: false
            },
        ]
    }
]

const pageItems = ['Site Layout', '3D Models', 'Floor Plan']