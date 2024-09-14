"""create projects table

Revision ID: dc5a514a0134
Revises: d5b10111f9ca
Create Date: 2024-09-14 20:16:28.333989

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dc5a514a0134'
down_revision: Union[str, None] = 'd5b10111f9ca'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
