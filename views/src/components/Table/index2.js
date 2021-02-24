import { useContext } from 'react';
import {useStyles} from './AddUserStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Context } from '../../App';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function UsersTable() {

  const classes = useStyles();
  const consumer = useContext(Context);
  const history = useHistory();

  const sortList = (data) => {
    let obj = [...data];
    obj.sort((a, b) => a.timeM - b.timeM);
    obj.map((item, i) => (<div key={i}> {item.matchID}
      {item.timeM} {item.description}</div>))
  }
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer Number</StyledTableCell>
            <StyledTableCell align="right">User Name</StyledTableCell>
            <StyledTableCell align="right">First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Last Login</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {consumer?.users?.map((user) => (
            <StyledTableRow key={user.name}>
              <StyledTableCell component="th" scope="row">{user.customer_number}</StyledTableCell>
              <StyledTableCell align="right">{user.user_name}</StyledTableCell>
              <StyledTableCell align="right">{user.first_name}</StyledTableCell>
              <StyledTableCell align="right">{user.last_name}</StyledTableCell>
              <StyledTableCell align="right">{user.last_login}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={() => history.push({ pathname: "/edit-user", state: { detail: user } })}
                >Edit</Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={() => consumer.deleteUser(user.id)} size="small" variant="contained" color="secondary">Delete</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
