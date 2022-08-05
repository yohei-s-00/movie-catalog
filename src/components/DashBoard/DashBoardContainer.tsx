import { Box } from "@mui/material";
import { PageTitle } from "@components/UI/Typography/PageTitle";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import { DashBoardPaper } from "./DashBoardPaper";

export const DashBoardContainer = () => {
  return (
    <div>
      <Box sx={{display: 'flex',alignItems: 'center',columnGap: 2}}>
        {/* <DashboardCustomizeIcon fontSize="large" /> */}
        {/* <PageTitle title="ダッシュボード" /> */}
      </Box>
      <DashBoardPaper title="動画コンテンツ登録" text="動画コンテンツ登録ができます" to="/admin/AddContent" />
      <DashBoardPaper title="未実装:動画コンテンツ更新・削除" text="動画コンテンツの更新、削除ができます" to="/admin/editContent" />
    </div>
  );
};
