import { useMutation, useQuery } from '@tanstack/react-query';
import styles from '../../styles/admin/adminMain.module.scss';
import { TitleContainer } from '../gathering/components/TitleContainer';
import { ListComponent } from './components/ListComponent';
import SectionTitle from '/src/components/SectionTitle';
import { deleteReport, getReportData, reportsType } from '/src/services/adminApi';
import { useEffect, useState } from 'react';
const PAGE_SIZE = 4;

export function AdminReportPage() {
    const [page, setPage] = useState(0);
    const [reportDataList, setReportDataList] = useState<reportsType[]>([])

    const { data: reportData, isFetched,
        isError, refetch } = useQuery({
            queryKey: ['userSearch', page],
            queryFn: () => getReportData(page, PAGE_SIZE),
            select: (data) => {
                return {
                    content: data.data.content,
                    totalPage: data.data.totalPages,
                }
            }

        })
    useEffect(() => {
        console.log(reportData);
    }, [reportData])

    const { mutate: deleteMutation } = useMutation({
        mutationFn: deleteReport,
        onSuccess: () => {
            refetch();
        }
    });
    function handleDeleteBtn(reportId: number) {
        console.log('삭제!!!!!!!!!!');
        deleteMutation(reportId);
    }

    useEffect(() => {
        const isSuccess = isFetched && !isError;

        if (isSuccess && reportData !== undefined) {

            setReportDataList(prevList => [...prevList, ...reportData.content]);

        }

    }, [isFetched, isError, reportData]);
    return (
        <div className={styles.adminPageContainer}>
            <TitleContainer title='신고 관리' />
            <div className={styles.searchContainer}>
                <SectionTitle title='신고정보 조회 및 관리' subtitle='신고 유저 및 신고 내용을 확인합니다.' />
            </div>
            {reportDataList && reportDataList.map((reportList: reportsType, index: number) => (
                <ListComponent key={index} title={`${reportList.reportedParticipantName}(${reportList.reportedParticipantNickname})`} subtitle={`신고자 : ${reportList.reporterName}(${reportList.reporterNickname})`} content={reportList.reason} isLast={
                    reportData &&
                    reportData?.totalPage >= page &&
                    reportDataList.length === index + 1
                }
                    setPage={setPage}
                    onClickDelete={() => handleDeleteBtn(reportList.id)} />
            ))}

        </div>
    )
}