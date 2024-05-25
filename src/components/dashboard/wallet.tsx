import React, { useMemo, useState } from 'react';
import { BoxFlex, Line, MainWrap, PageToggleText,} from '../../styles/reusable/index';
import SideBarWidget from '../reusable/sidebar';
import { DashboardFlex, DashboardHeader, DashboardInner, DashboardMain, WalletCard } from './style';
import QuickActionWidget from '../reusable/quickaction';
import Typography from '../reusable/typography';
import { PageToggleHeader } from '../../styles/reusable/index';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import CopiedNotifier from '../reusable/clipboard';
import { copyText } from '../../utils/copyText';
import TransactionCard from './TransactionCard';
import TransactionDetailsModal from './transactionDetails';
import BottomNavComp from '../reusable/bottomNav';
import { useMutation } from '@tanstack/react-query';
import { GET_TRANSACTIONS, GET_WALLET } from '../../api/transaction';
import { useCurrentUser } from '../../store/user/useCurrentUser';
import { useDispatch } from 'react-redux';
import { setWallet } from '../../store/user/reducer';
import TransactionSkeleton from '../skeletons/transaction/transaction';
import EmptyState from '../reusable/emptyState';

const DashboardWallet = () => {
    const dispatch = useDispatch();
    const currentUser = useCurrentUser()?.user;
    const [activePage, setActivePage] = useState('All');
    const [copied, setCopied] = useState(false);
    const [showdetails, setShowDetails] = useState(false);
    const [walletInfo, setWalletInfo] = useState<any>({})
    const [transactions, setTransactions] = useState([])
    const wallet = useCurrentUser()?.wallet;

    const { mutateAsync: get_wallet, isPending } = useMutation({
        mutationFn: GET_WALLET,
        onSuccess: (data) => {
            setWalletInfo(
                data?.data?.body?.wallet
            )
            dispatch(setWallet(data?.data?.body?.wallet))
        }
    })
    const { mutateAsync: get_transactions, isPending: isLoadingTransactions } = useMutation({
        mutationFn: GET_TRANSACTIONS,
        onSuccess: (data) => {
            setTransactions(
                data?.data?.body?.transactions
            )
        }
    })

    useMemo(() => {
        get_wallet({
            user_id: currentUser?.id
        });
        get_transactions({
            user_id: currentUser?.id
        })
    }, [])
 
    return(
        <>
            {
                copied ?
                    <CopiedNotifier />
                    : null
            }
            <MainWrap
                top='0rem'
                width='100%'
                maxWidth='1200px'
            >
                <DashboardFlex>
                    <SideBarWidget />
                    <DashboardMain>
                        <DashboardHeader>
                            <Typography 
                                text='Wallet'
                                color='#091525'
                                fontWeight={500}
                                fontSize='16px'
                                lineHeight='17.6px'
                            />
                        </DashboardHeader>
                        <WalletCard>
                            <Typography 
                                text='Wallet'
                                color='#fff'
                                fontWeight={600}
                                fontSize='16px'
                                lineHeight='17.6px'
                            />
                            <BoxFlex
                                margin='20px 0 12px 0'
                                hAlign='space-between'
                            >
                                <Typography 
                                    text='Wallet Balance'
                                    color='#fff'
                                    fontWeight={400}
                                    fontSize='15px'
                                    lineHeight='21px'
                                />
                                <Typography 
                                    text={walletInfo?.balance && `₦${walletInfo?.balance}`}
                                    color='#fff'
                                    fontWeight={600}
                                    fontSize='15px'
                                    lineHeight='21px'
                                />
                            </BoxFlex>
                            <Line border='1px solid #FFFFFF1A' />
                            <BoxFlex
                                margin='20px 0 12px 0'
                                hAlign='space-between'
                            >
                                <Typography 
                                    text='Account number'
                                    color='#fff'
                                    fontWeight={400}
                                    fontSize='15px'
                                    lineHeight='21px'
                                />
                                <BoxFlex
                                    style={{
                                        width: '50%'
                                    }}
                                    hAlign='flex-end'
                                    gap='8px'
                                >
                                    <Typography 
                                        text={wallet?.account_number || walletInfo?.account_number}
                                        color='#fff'
                                        fontWeight={600}
                                        fontSize='15px'
                                        lineHeight='21px'
                                    />
                                    <i>
                                        <DocumentDuplicateIcon 
                                            className='w-5 h-5' 
                                            color='#fff' 
                                            onClick={() => copyText({setCopied, text: wallet?.account_number || walletInfo?.account_number})}
                                        />
                                    </i>
                                </BoxFlex>
                            </BoxFlex>
                            <Line border='1px solid #FFFFFF1A' />
                            <BoxFlex
                                margin='12px 0'
                                hAlign='space-between'
                            >
                                <Typography 
                                    text='Account name'
                                    color='#fff'
                                    fontWeight={400}
                                    fontSize='15px'
                                    lineHeight='21px'
                                />
                                <Typography 
                                    text={wallet?.account_name || walletInfo?.account_name}
                                    color='#fff'
                                    fontWeight={600}
                                    fontSize='15px'
                                    lineHeight='21px'
                                />
                            </BoxFlex>
                            <Line border='1px solid #FFFFFF1A' />
                            <BoxFlex
                                margin='12px 0'
                                hAlign='space-between'
                            >
                                <Typography 
                                    text='Bank'
                                    color='#fff'
                                    fontWeight={400}
                                    fontSize='15px'
                                    lineHeight='21px'
                                />
                                <Typography 
                                    text={wallet?.bank_name || walletInfo?.bank_name}
                                    color='#fff'
                                    fontWeight={600}
                                    fontSize='15px'
                                    lineHeight='21px'
                                />
                            </BoxFlex>
                        </WalletCard>
                        <DashboardInner>
                        </DashboardInner>
                            {
                                transactions.length > 0 &&
                                <PageToggleHeader
                                    hAlign='center'
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
                            }
                            {
                                !isLoadingTransactions && transactions.length < 1 &&
                                    <EmptyState 
                                        text='No transactions'
                                        img='/images/wallet.svg'
                                        imgSize='15rem'
                                    />
                            }
                            <DashboardInner
                                style={{
                                    margin: 0,
                                }}
                            >
                                {isLoadingTransactions && <TransactionSkeleton />}
                                {
                                    transactions.length > 0 &&
                                        <TransactionCard 
                                            openDetails={() => setShowDetails(true)}
                                        />
                                }
                            </DashboardInner>
                    </DashboardMain>
                    <QuickActionWidget />
                </DashboardFlex>
                <BottomNavComp />
            </MainWrap>
            {
                showdetails ?
                    <TransactionDetailsModal
                        closeFunc={() => setShowDetails(false)}
                    />
                    : null
            }
        </>
    )
}

export default DashboardWallet;

const pageItems = ['All', '1 Month', '3 Months', '6 Months']