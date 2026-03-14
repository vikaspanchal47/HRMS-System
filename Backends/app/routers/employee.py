from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, crud, models

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/", response_model=schemas.EmployeeResponse)
def add_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):

    existing = db.query(models.Employee).filter(
        models.Employee.employee_id == employee.employee_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Employee already exists")
        # check duplicate email
    existing_email = db.query(models.Employee).filter(
        models.Employee.email == employee.email
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered for another employee"
        )
    return crud.create_employee(db, employee)



@router.get("/", response_model=list[schemas.EmployeeResponse])
def list_employees(
    department: str | None = Query(None),
    email: str | None = Query(None),
    name: str | None = Query(None),
    db: Session = Depends(get_db)
):

    query = db.query(models.Employee)

    if department:
        query = query.filter(models.Employee.department == department)

    if email:
        query = query.filter(models.Employee.email == email)

    if name:
        query = query.filter(models.Employee.full_name.ilike(f"%{name}%"))

    employees = query.all()

    return employees


@router.get("/{employee_id}", response_model=schemas.EmployeeResponse)
def get_employee_details(employee_id: str, db: Session = Depends(get_db)):

    employee = db.query(models.Employee).filter(
        models.Employee.employee_id == employee_id
    ).first()

    if not employee:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


@router.delete("/{employee_id}")
def remove_employee(employee_id: str, db: Session = Depends(get_db)):

    employee = crud.delete_employee(db, employee_id)

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"message": "Employee deleted"}