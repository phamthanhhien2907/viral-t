import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
  useMovieData,
} from '@mui/x-data-grid-generator';
import moment from 'moment';
import { apiUpdatedDesposit, apiUpdatedStatus } from '@/services/userService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { t } from 'i18next';
import { Textarea } from '@/components/ui/textarea';
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = new Date().getTime().toString();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', age: '', role: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Thêm dữ liệu
      </Button>
    </GridToolbarContainer>
  );
}
const CustomToolbar = ({ setRows, setRowModesModel, showQuickFilter, type }) => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-between'>
      
      {type === "lottery" ? <Button color="primary" startIcon={<AddIcon />} onClick={() => navigate("/lottery/new")}>
        Thêm dữ liệu
      </Button> : type === "categoryBelt" ? <Button color="primary" startIcon={<AddIcon />} onClick={() => navigate("/categoryBelt/new")}>
        Thêm dữ liệu
      </Button> : type === "customer" ? "" : type === "deposit" ?  "" :  type === "withDraw" ?  "" : type === "transform" ?  "" : type === "customerBank" ?  "" : <EditToolbar setRows={setRows} setRowModesModel={setRowModesModel} />}
      <GridToolbar showQuickFilter={showQuickFilter} />
    </div>
  );
}
export default function DataGridUI({initialRows, type, callApi}) {
  const formattedRows = React.useMemo(
    () =>
      (initialRows || []).map((row) => ({
        ...row,
        createdAtFormatted: row.createdAt
          ? moment(row.createdAt).format('DD-MM-YYYY HH:mm:ss')
          : 'Không có dữ liệu',
        updatedAtFormatted: row.updatedAt
          ? moment(row.updatedAt).format('DD-MM-YYYY HH:mm:ss')
          : 'Không có dữ liệu',
      })),
    [initialRows]
  );
  const [rows, setRows] = React.useState(formattedRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [selectedIds, setSelectedIds] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const [reason, setReason] = React.useState("")
  const [values, setValues] = React.useState(null)
  const handleClickOpen = (row, type) => {
    setOpen(true);
    setValues({...row, type})
  };
  console.log(values)

  const handleAction = async() => {
    if (type === "transform" && values) {
      try {
          const response = await apiUpdatedStatus(values?._id, values?.users?._id, {
            status: values?.type,
            reson: reason,
          });
          if (response?.success) {
              toast.success(values?.type === "Thành công" ? `Chấp nhận rút tiền với tài khoản ${values?.users?.username}` : `Không chấp nhận rút tiền với tài khoản ${values?.users?.username}`);
              callApi()
          } else {
              toast.error("Đã có lỗi xảy ra khi lưu dữ liệu");
          }
      } catch (error) {
          toast.error("An error occurred while saving data");
          console.error(error);
      }
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleSelectionChange = (newSelection) => {
    setSelectedIds(newSelection);
  }
  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
};

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };
  const processRowUpdate = async(newRow) => {
    const updatedRow = { ...newRow, isNew: false };
      if(type === "customerBank" && newRow.username || newRow.nameOfUser || newRow.creditCartOfBank || newRow.nameOfBank) {
        
          try {
            const res = await apiUpdatedDesposit(newRow?._id, {
              desposit: Number(newRow?.deposit),
              despositMinutes: Number(newRow?.depositMinutes),
              vip: newRow?.vip,
              creditCartOfBank : newRow?.creditCartOfBank,
              nameOfBank : newRow?.nameOfBank,
              nameOfUser : newRow?.nameOfUser,
            });
      
            if (res.success) {
              toast.success(res?.message);
              callApi()
            } else {
              toast.error(res?.message);
            }
          } catch (error) {
            console.log("[collections_POST]", error);
            toast.error("Something went wrong! Please try again.");
          }
      }
      setRows((prevRows) =>
        prevRows.map((row) => (row._id === newRow._id ? updatedRow : row))
      );
    
      return updatedRow;
  };
  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const VISIBLE_FIELDS = ["_id", 'title', 'createdAtFormatted', "createdAt",  'category', "name", "room", "username", "role", "code", "withDraw", "creditCartOfBank", "nameOfBank",  "deposit", "nameOfUser",  "userDeposit", "byPerson", "actions", "userWithdraw", "status", "reson", "updatedAt", "updatedAtFormatted", "vip", "depositMinutes", "periodNumber", "result"];
  const columns = [
    // {
    //   field: '_id',
    //   headerName: 'ID',
    //   width: 240,
    //   align: 'left',
    //   headerAlign: 'left',
     
    // },
    ...type === 'collection'
      ? [{ field: 'title', headerName: 'Name', width: 180, editable: true }]
      : [],
    
      ...type === 'deposit' 
      ? [{ field: 'userDeposit', headerName: 'Tài khoản thành viên', width: 180, editable: true,  renderCell: (params) => {
        const withDraw = params.row.users?.username;
        return withDraw
       
      }, },
      ]
      : [],
      ...type === 'deposit'
      ? [{ field: "byPerson", headerName: 'Người thực hiện', width: 180, editable: true,  renderCell: (params) => {
        return "admin"
       
      },}] : [],
      ...type === 'deposit'
      ? [{ field: 'deposit', headerName: 'Số tiền', width: 180, editable: true,  renderCell: (params) => {
        const withDraw = params.row.deposit;
        return withDraw?.toLocaleString("vi-VN") + "₫"
       
      }, }] : [],
      ...type === 'belt' 
      ? [{ field: 'room', headerName: 'Phòng', width: 140, editable: false,  renderCell: (params) => {
        const withDraw = params.row.belt;
        return withDraw
       
      }, }] : [],
      // ...type === 'belt' 
      // ? [{ field: 'periodNumber', headerName: 'Phiên', width: 720 , editable: false,  renderCell: (params) => {
      //   const withDraw = params.row.periodNumber;
      //   return (
      //     <div className="w-full flex flex-col items-start">
      //     <div className="flex flex-col gap-2">
      //       {withDraw}
      //     </div>
      //   </div>
      //   );
       
      // }, }] : [],
      ...type === 'withDraw' || type === "transform" 
      ? [{ field: 'userWithdraw', headerName: 'Người dùng', width: 140, editable: false,  renderCell: (params) => {
        const withDraw = params.row.users?.username;
        return withDraw
       
      }, }] : [],
      ...type === 'withDraw' || type === "transform"
      ? [{ field: 'nameOfUser', headerName: 'Chủ tài khoản', width: 180, editable: false,  renderCell: (params) => {
        const withDraw = params.row.users?.nameOfUser;
        return withDraw
       
      }, }] : [],
      ...type === 'withDraw'|| type === "transform"
      ? [{ field: 'creditCartOfBank', headerName: 'Số tài khoản', width: 180, editable: false,  renderCell: (params) => {
        const withDraw = params.row.users?.creditCartOfBank;
        return withDraw
       
      }, }] : [],
      ...type === 'withDraw'|| type === "transform"
      ? [{ field: 'nameOfBank', headerName: 'Tên ngân hàng', width: 180, editable: false,  renderCell: (params) => {
        const withDraw = params.row.users?.nameOfBank;
        return withDraw
       
      }, }] : [],
      ...type === 'customerBank'
      ? [{ field: 'username', headerName: 'Người dùng', width: 140, editable: false,  renderCell: (params) => {
        const withDraw = params.row?.username;
        return withDraw
       
      }, }] : [],
      ...type === 'customerBank'
      ? [{ field: 'vip', headerName: 'Vip (Level)', width: 140, editable: true,  renderCell: (params) => {
        const withDraw = params.row.vip;
        return withDraw
       
      }, }] : [],
      ...type === 'customerBank'
      ? [{ field: 'withDraw', headerName: 'Số dư', width: 140, editable: true,  renderCell: (params) => {
        const withDraw = params.row.withDraw;
         return withDraw?.toLocaleString("vi-VN") + "₫"
       
      }, }] : [],
     
      ...type === 'customerBank'
      ? [{ field: 'deposit', headerName: 'Nạp tiền', width: 180, editable: true,  renderCell: (params) => {
         return "Nhập số tiền muốn nạp"
       
      }, }] : [],
      ...type === 'customerBank'
      ? [{ field: 'depositMinutes', headerName: 'Trừ tiền', width: 180, editable: true,  renderCell: (params) => {
        return "Nhập số tiền muốn trừ"
       
      }, }] : [],
      ...type === 'customerBank'
      ? [{ field: 'nameOfUser', headerName: 'Chủ tài khoản', width: 180, editable: true,  renderCell: (params) => {
        const withDraw = params.row?.nameOfUser;
        return withDraw
       
      }, }] : [],
      ...type === 'customerBank'
      ? [{ field: 'creditCartOfBank', headerName: 'Số tài khoản', width: 180, editable: true,  renderCell: (params) => {
        const withDraw = params.row?.creditCartOfBank;
        return withDraw
       
      }, }] : [],
      ...type === 'customerBank'
      ? [{ field: 'nameOfBank', headerName: 'Tên ngân hàng', width: 180, editable: true,  renderCell: (params) => {
        const withDraw = params.row?.nameOfBank;
        return withDraw
       
      }, }] : [],
      ...type === 'withDraw'|| type === "transform"
      ? [{ field: 'withDraw', headerName: 'Số tiền', width: 120, editable: false,  renderCell: (params) => {
        const withDraw = params.row.withDraw.toFixed(0);
        return withDraw?.toLocaleString("vi-VN") + "₫"
       
      }, }] : [],
      ...type === 'withDraw'|| type === "transform"
      ? [{ field: 'status', headerName: 'Trạng thái', width: 160, editable: true, renderCell: (params) => {
        const withDraw = params.row.status;
        return withDraw
       
      }, }] : [],
    ...type === 'collection'
      ? [{ field: 'category', headerName: 'Category', width: 180, editable: true },
      ]
      : [],
    ...type === 'categoryBelt' || type === "categoryCollection"
      ? [{ field: 'name', headerName: 'Sảnh', width: 180, editable: true },
      ]
      : [],
    ...type === 'categoryBelt' 
      ? [{ field: 'room', headerName: 'Phòng', width: 720, editable: true,  type: 'singleSelect',  valueOptions: ['Đợi duyệt', 'Thành công', 'Không thành công'],  renderCell: (params) => {
        const withDraw = params.row.rooms?.map((room) => room.room).join(", ");
        
        return withDraw
       
      }, },
      ]
      : [],
    ...type === 'lottery'
      ? [{ field: 'room', headerName: 'Room', width: 180, editable: true },
      ]
      : [],
    ...type === 'customer'
      ? [{ field: 'username', headerName: 'Tên thành viên', width: 180, editable: true },
      ]
      : [],
      ...type === 'customer'
      ? [{ field: 'vip', headerName: 'Vip (Level)', width: 140, editable: true,  renderCell: (params) => {
        const withDraw = params.row.vip;
        return withDraw
       
      }, }] : [],
    ...type === 'customer'
      ? [{ field: 'role', headerName: 'Vai trò', width: 180, editable: true },
      ]
      : [],
    ...type === 'customer'
      ? [{ field: 'code', headerName: 'Mã mời', width: 180, editable: true },
      ]
      : [],
    ...type === 'customer'
      ? [{ field: 'withDraw', headerName: 'Số dư', width: 180, editable: true,  renderCell: (params) => {
        const withDraw = params.row.withDraw;
        
        return withDraw?.toLocaleString("vi-VN") + "₫"
       
      }, },
      ]
      : [],
    ...type ===  "withdrawal" ? [{ field: 'withDraw', headerName: 'Số dư', width: 180, editable: true,  renderCell: (params) => {
      const withDraw = params.row.withDraw;
      
      return withDraw?.toLocaleString("vi-VN") + "₫"
     
    }, },
    ]
    : [],
    ...type !==  "withDraw" ? [ {
      field: 'createdAtFormatted',
      headerName: type === "withDraw" ? 'Thời gian cập nhật' : type === "customer" ? 'Thời gian đăng ký' : type === "deposit" ? "Thời gian nạp tiền" : "Thời gian thêm",
      width: 170,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params) =>  params || "Không có dữ liệu",
    },
    ]
    : [],
    ...type ===  "withDraw" ? [ {
      field: 'updatedAtFormatted',
      headerName: type === "withDraw" ? 'Thời gian duyệt' : type === "customer" ? 'Thời gian đăng ký' : type === "deposit" ? "Thời gian nạp tiền" : "Thời gian rút tiền",
      width: 170,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params) =>  params || "Không có dữ liệu",
    },
    ]
    : [],
    ...type !==  "customer" && type !==  "deposit" && type !==  "withDraw"  ? [ {
      field: 'actions',
      type: 'actions',
      headerName: 'Hành động',
      width: type === "transform" ? 240 : 100,
      cellClassName: 'actions',
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            // eslint-disable-next-line react/jsx-key
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            // eslint-disable-next-line react/jsx-key
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          type === "transform" ? <div className='flex items-center gap-2'>
            <button className='w-20 h-8  bg-green-300 hover:bg-green-500' onClick={() => {
              handleClickOpen(row, "Thành công")
            }}>Chấp nhận</button>
            <button className='w-20 h-8  bg-red-500 hover:bg-red-700' onClick={() => {
              handleClickOpen(row, "Không thành công")
            }}>Từ chối</button>

          </div> : <>
          <button className='w-20 flex text-white items-center justify-center h-8 bg-green-500 hover:bg-green-700 font-medium' onClick={handleEditClick(id)}>Chỉnh sửa
            {/* <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
           
          
          /> */}
          </button>
            
       
        {/* <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          sx={{
            backgroundColor: "red",
            color: "white",
            '&:hover': {
              backgroundColor: "darkred"
            },
            borderRadius: "4px",
            padding: "4px"
          }}
        /> */}
          </>
        ];
      },
    },
  ]: []
  ];
  const data = React.useMemo(
    () => columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    [columns],
  );
  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={data}
        editMode="row"
        rowModesModel={rowModesModel}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        // pageSizeOptions={[5]}
        // checkboxSelection={type === "withDraw"}
        // disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[5]}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        getRowId={(row) => row._id}
        onRowSelectionModelChange={handleSelectionChange} 
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: CustomToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel, showQuickFilter: true, type : type },
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Bạn có chắc chắn muốn thực hiện hành động này không?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <Textarea
            onChange={(e) => setReason(e.target.value)}
            name="Neutral"
            placeholder="Nhập lý do"
            variant="outlined"
            color="neutral"
          />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Quay về</Button>
          <Button onClick={() => {
            handleAction()
            handleClose()
          }} autoFocus>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}