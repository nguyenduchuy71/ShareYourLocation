"""add code column in the projects table

Revision ID: 49743111e0d7
Revises: dc5a514a0134
Create Date: 2024-09-15 10:24:44.068806

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '49743111e0d7'
down_revision: Union[str, None] = 'dc5a514a0134'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
