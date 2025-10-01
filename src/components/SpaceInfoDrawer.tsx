import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelectedSpace } from "../context/SelectedSpaceContext";

export function SpaceInfoDrawer() {
  const { selectedSpace, clearSelectedSpace } = useSelectedSpace();

  return (
    <Drawer
      anchor="right"
      open={!!selectedSpace}
      onClose={clearSelectedSpace}
      PaperProps={{
        sx: {
          width: 320,
          borderTopLeftRadius: "20px",
          borderBottomLeftRadius: "20px",
          padding: 2,
          bgcolor: "oklch(96.7% 0.003 264.542)",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    >
      {selectedSpace && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center p-5">
            <h2 className="font-semibold text-lg">ინფორმაცია</h2>
            <IconButton size="small" onClick={clearSelectedSpace}>
              <CloseIcon />
            </IconButton>
          </div>
          <ul className="flex flex-col gap-3 text-sm">
            <div className="flex justify-center items-center">
              <img
                className="rounded-full bg-cover"
                src={selectedSpace["image"]}
                alt={selectedSpace["მფლობელი"]}
              />
            </div>
            <li>
              <b>მფლობელი:</b> {selectedSpace["მფლობელი"]}
            </li>
            <li>
              <b>იჯარის ღირებულება:</b> {selectedSpace["იჯარის ღირებულება"]} ₾
            </li>
            <li>
              <b>დენის გადასახადი:</b> {selectedSpace["დენის გადასახადი"]} ₾
            </li>

            <li>
              <b>იჯარის დავალიანება:</b> {selectedSpace["იჯარის დავალიანება"]} ₾
            </li>
            <li>
              <b>ფართობი:</b> {selectedSpace["ფართობი"]} მ²
            </li>
          </ul>
        </div>
      )}
    </Drawer>
  );
}
